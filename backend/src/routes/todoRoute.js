import { Router } from "express";
import {
  addtodo,
  fetchtodo,
  deletetodo,
  updateTodo,
} from "../controllers/todocontrroller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();

router.route("/addTodo").post(verifyJWT, addtodo);
router.route("/fetchTodos").get(verifyJWT, fetchtodo);
router.route("/deleteTodo/:id").delete(verifyJWT, deletetodo);
router.route("/updateTodo/:id").patch(verifyJWT, updateTodo);

export default router;
