import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protecRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.clearCookie("jwt");
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Buscar usuario y verificar estado
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.clearCookie("jwt");
            return res.status(404).json({ error: "User not found" });
        }

        // Verificar si la cuenta está activa (nuevo check)
        if (user.active === false) {
            res.clearCookie("jwt");
            return res.status(403).json({
                error: "Account deactivated",
                deactivated: true  // Flag especial para el frontend
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("Error in protecRoute middleware", err.message);

        // Limpiar cookie si el token es inválido/expirado
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            res.clearCookie("jwt");
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};