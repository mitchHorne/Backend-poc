import Router from "@koa/router";
import multer from "@koa/multer";

import {
  getEmployees,
  insertEmployees,
  clearDatabase,
} from "./database/index.js";
import { convertXlsxToJson } from "./xlsx_data_handling/index.js";

const upload = multer();
const router = new Router();

router.get("/api/employees", async (ctx) => {
  try {
    ctx.body = await getEmployees();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post(
  "/api/upload/employees",
  upload.single("data_file"),
  async (ctx) => {
    try {
      const data = convertXlsxToJson(ctx.file.buffer);
      await insertEmployees(data);
      ctx.status = 201;
    } catch (error) {
      ctx.status = 500;
      ctx.body = error.message;
    }
  }
);

router.delete("/api/employees", async (ctx) => {
  try {
    await clearDatabase();
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
