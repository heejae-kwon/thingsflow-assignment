import pg from "pg";
import config from "./config";

interface ContentRequest {
  type: string;
  phase: number;
  response: string | undefined;
  content: string;
}
class ThingsFlowDB {
  private pool: pg.Pool;
  constructor() {
    this.pool = new pg.Pool({
      user: config.DB_USER,
      host: config.DB_HOST,
      database: config.DB,
      password: config.DB_PASSWORD,
      port: parseInt(config.DB_PORT!!),
    });
    this.pool.on("connect", () => {
      console.log("connected to the db");
    });

    this.createTables();
  }

  async createTables() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      contents(
        ID SERIAL PRIMARY KEY NOT NULL,
        Type VARCHAR(30) NOT NULL,
        Phase INT NOT NULL,
        Response VARCHAR(30),
        Content VARCHAR(255) NOT NULL
      )`;

    const client = await this.pool.connect();
    try {
      const result = await client.query(queryText);
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }

  async getContent(contentReq: ContentRequest) {
    let content: string = "";
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT Type, Phase, Response, Content FROM Contents ` +
          `WHERE Type='${contentReq.type}' ` +
          `AND Phase='${contentReq.phase}' ` +
          `AND Response='${contentReq.response}'`,
      );
      if (result.rows.length > 0) {
        content = result.rows[0].content;
      }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return content;
    }
  }

  async insertContent(contentReq: ContentRequest) {
    let complete = false;
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO contents (Type, Phase, Response, Content)` +
          `VALUES ('${contentReq.type}', '${contentReq.phase}', ` +
          `'${contentReq.response}', '${contentReq.content}')`,
      );
      // if (result.rowCount !== 0) {
      complete = true;
      // }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return complete;
    }
  }
  async findContent(contentReq: ContentRequest) {
    let found = false;
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT Type, Phase, Response, Content FROM Contents ` +
          `WHERE Type='${contentReq.type}' ` +
          `AND Phase='${contentReq.phase}' ` +
          `AND Response='${contentReq.response}'`,
      );
      if (result.rowCount !== 0) {
        found = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return found;
    }
  }
}
const db = new ThingsFlowDB();
export default db;
