import express from "express";
import { getTodos, createTodo, getTodo } from "../controller/index.js";

const router = express.Router();

router.get('/users/todos', getTodos);
router.get('/users/todos/:id', getTodo);
router.post('/users/todos', createTodo);

export default router;