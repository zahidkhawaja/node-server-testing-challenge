const db = require("../data/dbConfig");

module.exports = {
    getAll,
    insert,
    remove
}

function getAll() {
    return db("computers");
}

async function insert(computer) {
    return db("computers").insert(computer, id);
}

function remove(id) {
    return db("computers").where("id", id).del();
}