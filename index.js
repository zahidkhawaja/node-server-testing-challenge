const server = require("./api/server");

const port = process.env.PORT || 7200;

server.listen(port, () => console.log(`\n Server running on port ${port} \n`));