import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/user.js";
import createError from "../util/createError.js";
import { User } from "../model/index.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/* register */
export const register = async (req, res, next) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const picturePath = req.protocol + '://' + req.get('host') + '/' + req.file.filename;
        // const picturePath = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;

        // checking for the existence of the user
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
            return next(createError({ status: 400, message: 'user already exists' }));
        }
        
        // hashing a password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ 
            firstname, 
            lastname, 
            email,
            password: hashedPassword,
            picturePath
        });
        await newUser.save();
        return res.status(201).json('New user created!');
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

/* login */
export const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        //checking for the existence of the user
        const user = await userModel.findOne({email}).select('+password');
        if(!user) {
            return next(createError({status: 404, message: 'user not found'}));
        }

        //checking the correctness of the password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect) {
            return next(createError({status: 400, message: 'Invalid password'}));
        }

        // creating token
        const payload = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '1d'});
        return res.cookie('auth_token', token, {
            httpOnly: true
        }).status(200).json({message: 'login successful'});

    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

export const logout = (req, res) => {
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'logout successful'});
}

export const isLoggedIn = (req, res) => {
    const token = req.cookies.auth_token;   

    if(!token) {
        return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if(err) {
            return res.json(false);
        } 
        return res.json(true);
    });
}
