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