import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.static(path.join(__dirname, '../frontend/public')));


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