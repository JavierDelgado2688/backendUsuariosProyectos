import Express from "express";
import {
  queryAllUsers,
  createUser,
  editUser,
  deleteUser,
} from "../../controllers/usuarios/controller.js";

const rutasUsuarios = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los Usuarios");
  } else {
    res.json(result);
  }
};

rutasUsuarios.route("/users").get((req, res) => {
  queryAllUsers(genericCallback(res));
});

rutasUsuarios.route("/users/new").post((req, res) => {
  createUser(req.body, genericCallback(res));
});

rutasUsuarios.route("/users/edit").patch((req, res) => {
  editUser(req.body, genericCallback(res));
});

rutasUsuarios.route("/users/delete").delete((req, res) => {
  deleteUser(req.body.id, genericCallback(res));
});

export default rutasUsuarios;
