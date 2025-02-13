import Koa from "koa";
import router from "./routes.js";
import serve from "koa-static";

const app = new Koa();
app.use(serve("dist/"));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
