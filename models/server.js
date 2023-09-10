const express = require('express');
const cors = require("cors");
require("dotenv").config();
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRolesPath = "/api/roles";
        //middlewares
        this.middlewares();
        //app routes
        this.routes();
    }

    middlewares() {
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.userRolesPath, require("../routes/user-roles.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;