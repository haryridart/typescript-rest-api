import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
    afterEach(async () => {
        await UserTest.delete();
    });
    it("should reject register new user if request is invalid", async () => {
        const response =  await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: ""
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should register new user if request is valid", async () => {
        const response =  await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
});

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it("should be able to login", async () => {
        const response =  await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
    it("should reject if username is wrong", async () => {
        const response =  await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salah",
                password: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
    it("should reject if password is wrong", async () => {
        const response =  await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "salah"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});
describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it("should be able to get current user", async () => {
        const response =  await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
    it("should reject get current user if token is wrong", async () => {
        const response =  await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "salah");
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});
describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it("should reject update user if request is invalid", async () => {
        const response =  await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: ""
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
    it("should reject update user if token is wrong", async () => {
        const response =  await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                name: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
    it("should be able to update user name", async () => {
        const response =  await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "yawa"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("yawa");
    });
    it("should be able to update user password", async () => {
        const response =  await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true);
    });
});
describe("DELETE /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it("should be able to logout", async () => {
        const response =  await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");

        const user = await UserTest.get();
        expect(user.token).toBeNull();
    });
    it("should reject logout if token is wrong", async () => {
        const response =  await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "salah");
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});