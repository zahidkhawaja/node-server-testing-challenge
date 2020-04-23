const express = require("express");

const Computers = require("../computers/computersModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ message: "API is up"})
})

// GET all computers
server.get("/computers", (req, res) => {

})

// POST new computer
server.post("/computers", (req, res) => {

})

// DELETE a computer by ID
server.delete("/computers", (req, res) => {
    
})

module.exports = server;