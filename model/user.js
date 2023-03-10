import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    picturePath: {type: String, required: true}
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);

export default userModel;