'use strict'

import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { dbConnection } from "./mongo.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioPath = "/coffeApi/v1/users"
        this.authPath = "/coffeApi/v1/auth"

        this.middleares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }
    middleares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
    }

    routes() {
        this.app.listen(this.usuarioPath, () => {
            console.log("Server | users route is running", this.port);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server | server is running on port", this.port);
        });
    }
}

export default Server;