import { Todo, User } from "../model/index.js";

// get all todos
const getTodos = async(req, res) => {
    const id = req.user.id;
    // const username = req.params['username'];
    await Todo.find({id: id}).sort({date: 'desc'})
            .then((todos) => res.json(todos))
            .catch((err) => console.log(err));
}

// get specific todo
const getTodo = async(req, res) => {
    const id = req.user.id;
    // const user = await User.findById(id);
    // console.log(user);
    const _id = req.params['id'];
    console.log(id);
    // await Todo.find({userId: user.id, taskId: _id})
    //             .then((todo) => res.json(todo))
    //             .catch((err) => console.log(err));
            
    await Todo.findById(_id)
            .then((todo) => res.json(todo))
            .catch((err) => console.log(err));
}

// create todo
const createTodo = async(req, res) => {
    const { title, date, description, category, priority, status } = req.body;
    const id = req.user.id;

    const newTodo = await Todo({
        title,
        date,
        description,
        category,
        priority,
        status,
        user: id
    });
    await newTodo.save()
            .then(() => res.json({msg: 'todo created', newTodo}))
            .catch((err) => res.status(400).json(`Error: ${err}`));
}

export { getTodos, getTodo, createTodo };