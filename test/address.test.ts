import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts/:idContact/addresses", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to create address", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Kalimalang",
                city: "Malang",
                province: "Jawa Tengah",
                country: "Indonesia",
                postal_code: "442212"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jl. Kalimalang");
        expect(response.body.data.city).toBe("Malang");
        expect(response.body.data.province).toBe("Jawa Tengah");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("442212");
    });
    it("should reject create address if contact not found", async () => {
        const response =  await supertest(web)
            .post(`/api/contacts/99999/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Kalimalang",
                city: "Malang",
                province: "Jawa Tengah",
                country: "Indonesia",
                postal_code: "442212"
            });
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
    it("should reject create address if request body is not valid", async () => {
        const contact = await ContactTest.get();
        const response =  await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "",
                city: "Malang",
                province: "Jawa Tengah",
                country: "Indonesia",
                postal_code: "442212"
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});