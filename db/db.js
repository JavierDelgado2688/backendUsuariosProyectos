import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const getDB = () => {
  return conexion;
};

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error("error de conexion");
    }
    conexion = db.db("users");
    console.log("conexion exitosa");
    return callback();
  });
};

export { conectarBD, getDB };
