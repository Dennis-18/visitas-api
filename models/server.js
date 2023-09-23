
import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
dotEnv.config();

import userRolesMiddlewares from "../routes/user-roles.routes.js";
import usersMiddlewares from "../routes/users.routes.js";
export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "api/auth";
        this.userRolesPath = "/api/roles";
        this.usersPath = "/api/users";
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.userRolesPath, userRolesMiddlewares);
        this.app.use(this.usersPath, usersMiddlewares);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}