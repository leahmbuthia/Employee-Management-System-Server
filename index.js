import express from "express";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRoute } from "./Routes/EmployeeRoute.js";
import cors from 'cors'
import  Jwt from 'jsonwebtoken'
// import cookieParser from "cookie-parser";


const app =express()
app.use(cors({
    origin: ["http://localhost:5173"], // Ensure this matches exactly with your frontend origin
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true // Allow credentials to be sent
}));
app.use(express.json())
// app.use(cookieParser)
app.use('/auth',adminRouter);
app.use('/employee',EmployeeRoute);
app.use(express.static('Public'))

const verifyUser =(req,res,next)=>{
    const token =req.cookies.token;
    if(token){
      Jwt.verify(token,"jwt_secret_key",(err,decoded) =>{
        if(err) return res.json({Status:false, Error:"Wrong Token"})
            req.id=decoded.id;
           req.role=decoded.role;
           next();

      })
      
    }else{
        return res.json({Status:false, Error:"Not autheticated"})
    }
}
app.get('verify',verifyUser,(req,res)=>{
    return res.json({Status:true, role: req.role, id: req.id})
})

app.listen(3000, ()=>{
    console.log("server running");
})