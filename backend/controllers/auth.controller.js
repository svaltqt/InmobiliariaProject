import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {generateTokenAndSetCookie} from "../lib/utils/generateToken.js";
import { UserPrototype } from "../lib/prototypes/userPrototype.js";


export const signup = async (req,res)=>{
    try{
        const {fullName, username, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"Username is already taken"});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email is already taken"});
        }
        if(password.length < 6){
            return res.status(400).json({error:"Password must be at least 6 characters long"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creamos un prototipo base
        const basePrototype = new UserPrototype({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        const userClone = basePrototype.clone();
        const newUser = new User(userClone);

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email:  newUser.email,
                address: newUser.address,
                tel: newUser.tel,
                type: newUser.type,
                favorites: newUser.favorites,
                profileImg: newUser.profileImg,
            })
        }else{
            res.status(400).json({error:"Invalid user Data"});

        }
    }   catch (error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const login = async (req,res)=>{
    try{
        const{username, password} = req.body;
        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email:  user.email,
            address: user.address,
            tel: user.tel,
            type: user.type,
            favorites: user.favorites,
            profileImg: user.profileImg,
        })

    }catch (error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const logout = async (req,res)=>{
    try{
        res.cookie("jwt", "", {
            maxAge: 0,});
        res.status(200).json({message:"Logged out successfully"});
    }catch (error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email }).select("password");

        if (!user) {
            return res.status(404).json({
                error: "Correo no registrado"
            });
        }
        res.status(200).json({
            success: true,
            password: user.password // Esto es solo para pruebas
        });

    } catch (error) {
        res.status(500).json({ error: "Error al recuperar contraseña" });
    }
};
