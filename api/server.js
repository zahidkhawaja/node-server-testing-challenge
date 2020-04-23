const express = require("express");

const Computers = require("../computers/computersModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ message: "API is up"})
})

// GET all computers
server.get("/computers", (req, res) => {
    Computers.getAll()
    .then(computers => res.status(200).json(computers));
});

// POST new computer
server.post("/computers", (req, res) => {
    Computers.insert(req.body)
    .then(ids => res.status(201).json({ message: "Successfully added computer." }))
    .catch(error => res.status(500).json({ errorMessage: error.message }));
});

// DELETE a computer by ID
server.delete("/computers/:id", (req, res) => {
    Computers.remove(req.params.id)
    .then(id => res.status(200).json({ message: "Successfully deleted computer." }))
    .catch(error => res.status(500).json({ errorMessage: error.message }))
});

module.exports = server;