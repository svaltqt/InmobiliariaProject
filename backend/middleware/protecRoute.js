import User  from "../models/user.model.js";
import jwt from "jsonwebtoken";

export  const protecRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        // Log the cookies received and the token for debugging
        //console.log('Cookies recibidas:', req.cookies);
        //console.log('Token recibido:', req.cookies.jwt);

        if(!token){
            return res.status(401).json({error: "Unauthorized: No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Unauthorized: Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        req.user = user;
        next();

    }
    catch (err) {
        console.log("Error in protecRoute middleware", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }


}