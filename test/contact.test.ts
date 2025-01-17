import supertest from "supertest";
import { logger } from "../src/application/logging";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to create contact", async () => {
        const response =  await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Hary",
                last_name: "Ridart",
                email: "haryridart@me.com",
                phone: "08123456789"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Hary");
        expect(response.body.data.last_name).toBe("Ridart");
        expect(response.body.data.email).toBe("haryridart@me.com");
        expect(response.body.data.phone).toBe("08123456789");

    });
    it("should reject create new contact if request is invalid", async () => {
        const response =  await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "Ridart",
                email: "haryridart@me.com",
                phone: "08123456789"
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});
describe("GET /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to get contacts", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });
    it("should reject get contact if id is not found", async () => {
        const response =  await supertest(web)
            .get(`/api/contacts/999999`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});
describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to update contact", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Hary",
                last_name: "Ridart",
                email: "haryridart@me.com",
                phone: "08123456789"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Hary");
        expect(response.body.data.last_name).toBe("Ridart");
        expect(response.body.data.email).toBe("haryridart@me.com");
        expect(response.body.data.phone).toBe("08123456789");
    });
    it("should reject update contact if request is invalid", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "Ridart",
                email: "haryridart@me.com",
                phone: "08123456789"
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
    it("should reject update contact if id is not found", async () => {
        const response =  await supertest(web)
            .put(`/api/contacts/999999`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Hary",
                last_name: "Ridart",
                email: "haryridart@me.com",
                phone: "08123456789"
            });
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});
describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to delete contact", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });
    it("should reject delete contact if id is not found", async () => {
        const response =  await supertest(web)
            .delete(`/api/contacts/999999`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});
describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to get all contacts", async () => {
        const response =  await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });
    it("should be able to search contact using name", async () => { 
        const response =  await supertest(web)
            .get("/api/contacts")
            .query({
                name: "est"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });
    it("should be able to search contact using email", async () => { 
        const response =  await supertest(web)
            .get("/api/contacts")
            .query({
                email: ".com"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });
    it("should be able to search contact using phone", async () => { 
        const response =  await supertest(web)
            .get("/api/contacts")
            .query({
                phone: "123"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });
    it("should be able to search contact without result", async () => { 
        const response =  await supertest(web)
            .get("/api/contacts")
            .query({
                name: "Teguh"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    });
    it("should be able to search contact with paging", async () => { 
        const response =  await supertest(web)
            .get("/api/contacts")
            .query({
                page: 2,
                size: 1
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });
});