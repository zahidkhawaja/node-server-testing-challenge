const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig");

describe("server test suite", () => {

    describe("Check API is up", () => {
        it("should return 200 ok", () => {
            return request(server).get("/")
            .then(res => expect(res.status).toBe(200));
        })
    });

    describe("GET all computers /", () => {
        it("should return 200 ok", () => {
            return request(server).get("/computers")
            .then(res => expect(res.status).toBe(200));
        })
    });

    describe("POST new computer /computers", () => {
        it("should return a 201 successfully created", () => {
            return request(server).post("/computers").send({ name: "Dell XPS" })
            .then(res => expect(res.status).toBe(201));
        })
    });

    describe("DELETE a computer /computers", () => {
        it("should return a 200 successfully deleted", () => {
            return request(server).delete("/computers/:id")
            .then(res => expect(res.status).toBe(200));
        })
    });

});