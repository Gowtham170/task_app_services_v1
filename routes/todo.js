import express from "express";
import { getTodos, getAllTodosTitle, createTodo, getTodo, updateTodo, deleteTodo } from "../controller/index.js";

const router = express.Router();

router.get('/users/todos', getTodos);
router.get('/users/todos/title', getAllTodosTitle);
router.get('/users/todos/:id', getTodo);
router.post('/users/todos', createTodo);
router.put('/users/todos/:id', updateTodo);
router.delete('/users/todos/:id', deleteTodo);

export default router;