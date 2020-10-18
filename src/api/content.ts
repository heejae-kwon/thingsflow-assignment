import express from "express";
import ThingsFlowDB from "../ThingsFlowDB";

const router = express.Router();

interface ContentRequest {
  //콘텐츠 형태
  type: string;
  phase: number;
  //유저의 대답, 유저의 선택 등등
  response: string | undefined;
  content: string;
}

//콘텐츠 사용 API
router.get("/", async (req, res) => {
  if (!req.query.type || !req.query.phase) {
    res.status(400).send();
    return;
  }
  const contentRequest = {
    type: req.query.type as string,
    phase: parseInt(req.query.phase as string),
    response: req.query.response,
    content: "",
  } as ContentRequest;
  if (!contentRequest.response) {
    contentRequest.response = "";
  }
  try {
    const content = await ThingsFlowDB.getContent(contentRequest);
    res.status(200).send({ content });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//챗봇 메시지 콘텐츠 입력(제작) API
//Only to create, not update
router.post("/", async (req, res) => {
  if (!req.body.type || req.body.phase === undefined || !req.body.content) {
    res.status(400).send();
    return;
  }

  const contentReq = req.body as ContentRequest;
  if (!contentReq.response) {
    contentReq.response = "";
  }

  try {
    const found = await ThingsFlowDB.findContent(contentReq);
    if (found) {
      res.status(403).send({ message: "Duplicated" });
      return;
    }

    const result = await ThingsFlowDB.insertContent(contentReq);
    if (result) {
      res.status(200).send();
    } else {
      res.status(500).send({ message: "INSERT is failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
