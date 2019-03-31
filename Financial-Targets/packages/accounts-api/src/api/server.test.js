import supertest from "supertest";
import Koa from "koa";
import router from "koa-joi-router";

const app = new Koa();
const route = router();

route.get("/", async (ctx) => {
    ctx.status = 200;
});

app.use(route.middleware());
app.listen(8081);

const request = supertest("http://localhost:8081");

describe("Server Accounts API", () => {
    test("Should answer on port 8081", async () => {
        const res = await request.get("/");
        expect(res.status).toEqual(200);
    });
});
