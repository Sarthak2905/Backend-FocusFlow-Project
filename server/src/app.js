import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true,
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route

app.get("/", (req,res) =>{
    res.json({
        success:true,
        message:"TaskFlow Backend is Running",
    });
});

export default app;