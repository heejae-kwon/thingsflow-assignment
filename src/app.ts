import express from "express";
import apiRouter from "./api/index";
const main = async () => {
  const app = express();
  const port = 8000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", apiRouter);

  app.get("/", (req, res) => {
    res.send("The Server is working");
  });

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
};

main();
