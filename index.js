import express from "express";
import { adminRouter } from "./Routes/AdminRoute.js";
import cors from 'cors'


const app =express()
app.use(cors({
    origin: ["http://localhost:5173"], // Ensure this matches exactly with your frontend origin
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true // Allow credentials to be sent
}));
app.use(express.json())
app.use('/auth',adminRouter);

app.listen(3000, ()=>{
    console.log("server running");
})