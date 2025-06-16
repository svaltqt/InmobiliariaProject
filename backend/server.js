import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectDB()
        .then(() => console.log(`Server started at port ${PORT}`))
        .catch(error => {
            console.error("Failed to connect to DB:", error);
            process.exit(1);
        });
});