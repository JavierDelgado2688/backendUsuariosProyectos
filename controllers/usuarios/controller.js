import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllUsers = async (callback) => {
  const conexion = getDB();
  await conexion.collection("person").find({}).limit(50).toArray(callback);
};

const createUser = async (datosUser, callback) => {
  if (
    Object.keys(datosUser).includes("nombre") &&
    Object.keys(datosUser).includes("identificacion") &&
    Object.keys(datosUser).includes("rol") &&
    Object.keys(datosUser).includes("estado")
  ) {
    const conexion = getDB();
    await conexion.collection("person").insertOne(datosUser, callback);
  } else {
    return "error";
  }
};

const editUser = async (edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const conexion = getDB();
  await conexion
    .collection("person")
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteUser = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const conexion = getDB();
  await conexion.collection("person").deleteOne(filtroUsuario, callback);
};

export { queryAllUsers, createUser, editUser, deleteUser };
