import { register, login, logout, isLoggedIn } from './auth.js';
import { getTodos, getAllTodosTitle, getTodo, createTodo, updateTodo, deleteTodo } from "./todo.js";
import { getUserDetails } from './user.js';

export {
    register,
    login,
    logout,
    isLoggedIn,
    getTodos,
    getAllTodosTitle,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getUserDetails
}