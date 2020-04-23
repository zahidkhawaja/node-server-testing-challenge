const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig");

describe("server test suite", () => {

    describe("Check API is up", () => {
        it("should return 200 status", () => {
            return request(server).get("/")
            .then(res => expect(res.status).toBe(200));
        })
    });

    describe("GET all computers /", () => {
        it("should return 200 status", () => {
            return request(server).get("/computers")
            .then(res => expect(res.status).toBe(200));
        })

        // Clear db first
        beforeEach(async () => {
            await db("computers").truncate();
        });

        // Make sure an array is returned
        it("return an array", () => {
            return request(server).get("/computers")
            .then(res => {
                let val = Array.isArray(res.body);
                expect(val).toBe(true);
            })
        })
    });

    describe("POST new computer /computers", () => {

        // Clear db first
        beforeEach(async () => {
            await db("computers").truncate();
        });

        it("should return a 201 status", () => {
            return request(server).post("/computers").send({ name: "Dell XPS" })
            .then(res => expect(res.status).toBe(201));
        })

        it("should return the message 'Successfully added computer.'", () => {
            return request(server).post("/computers").send({ name: "Microsoft Surface" })
            .then(res => expect(res.body.message).toBe("Successfully added computer."));
        })

        // Checking to make sure something is actually added to the database. Before & after adding
        it("add computer to the database", async () => {
            const beforeAdding = await db("computers");
            expect(beforeAdding).toHaveLength(0);

            await request(server).post("/computers").send({ name: "MacBook" })
            .then(res => res.end)

            const afterAdding = await db("computers");
            expect(afterAdding).toHaveLength(1);
        })
    });

    describe("DELETE a computer /computers", () => {
        it("should return a 200 status", () => {
            return request(server).delete("/computers/:id")
            .then(res => expect(res.status).toBe(200));
        })

        it("should return the message 'Successfully deleted computer.'", () => {
            return request(server).delete("/computers/:id")
            .then(res => expect(res.body.message).toBe("Successfully deleted computer."));
        })
    });

});