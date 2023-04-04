import { Todo, User } from "../model/index.js";

// get all todos
const getTodos = async (req, res, next) => {
    try {
        const id = req.user.id;

        // const username = req.params['username'];
        const todos = await Todo.find({ user: id }).sort({ date: 'desc' })
        return res.status(200).json(todos);
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

const getAllTodosTitle = async (req, res) => {
    try {
        const id = req.user.id;
        const taskTitle = await Todo.find({user: id}).select('title');
        return res.status(200).json(taskTitle);
        
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

// get specific todo
const getTodo = async (req, res) => {
    try {

        // const userId = req.user.id;
        // const user = await User.findById(id);
        // console.log(user);

        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });
        return res.status(200).json(todo);

        // await Todo.find({userId: user.id, taskId: _id})
        //             .then((todo) => res.json(todo))
        //             .catch((err) => console.log(err));
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }

}

// create todo
const createTodo = async (req, res) => {

    try {
        const { title, date, description, category, priority, status } = req.body;
        const id = req.user.id;

        const newTodo = new Todo({
            title,
            date,
            description,
            category,
            priority,
            status,
            user: id
        });
        const savedTodo = await newTodo.save();
        return res.status(201).json(savedTodo);
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

// update todo
const updateTodo = async (req, res) => {

    try {
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });

        if (!todo) {
            return res.status(404).json({ msg: 'No task found' });
        }
        if (!(todo.user.toString() === req.user.id)) {
            return res.status(401).json({ msg: 'this task not belongs to you' });
        }
        
        const updateTask = await Todo.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json({ msg: 'todo updated', updateTask });

    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

// delete task
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Todo.findById({ _id: id});

        if(!task) {
            return res.status(404).json({ msg: 'No task found' });
        }
        if (!(task.user.toString() === req.user.id)) {
            return res.status(401).json({ msg: 'this task not belongs to you' });
        }

        const deleteTask = await Todo.findByIdAndDelete(id);
        return res.status(200).json({ msg: 'todo deleted', deleteTask });
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

export { getTodos, getAllTodosTitle, getTodo, createTodo, updateTodo, deleteTodo };