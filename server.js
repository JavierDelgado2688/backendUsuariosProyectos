//import de express
//const express = require('express');

import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD, getDB } from "./db/db.js";
import rutasUsuarios from "./views/Usuarios/rutas.js";

dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());

app.use(Cors());

app.use(rutasUsuarios)

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
