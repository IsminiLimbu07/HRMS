    import express from "express";
    import morgan from "morgan";
    import mongoose from "mongoose"; //importing mongoose for database connection
    import cors from "cors"; //importing cors for cross-origin resource sharing
    import dotenv from "dotenv";
    import {
        createEmployee,
        getAllEmployees,
        getEmployeesById,
        updateEmployee,
        deleteEmployee,
    } from "./controllers/employee.controller.js";
    
    import { loginEmployee } from "./controllers/auth.controller.js"; 
    import { authorizeToken, checkRole } from "./middleware/auth.middleware.js";
    dotenv.config(); // configuring .env file

    const app = express();
    const PORT = process.env.PORT;

    // MIDDLE WARE
    // for logging information
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(
        cors({

        option: "*",
        }
    )); // enabling CORS for all routes

    // Creating Route
    // app.get("/dharan", (req, res) => {
    // res.status(200).json({ message: "Welcome to Dharan" });
    // });

    app.post("/employee",  createEmployee);
    app.get("/employee",authorizeToken, checkRole, getAllEmployees);
    app.get("/employee/:id", getEmployeesById);
    app.put("/employee/:id", updateEmployee);
    app.delete("/employee/:id", authorizeToken, deleteEmployee);
    app.post("/auth", loginEmployee);

    

    //Route to verify Token:
    app.get('/', authorizeToken, (req, res)=>{
    res.status(200).json({message: "token verified!"})
    });

    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully🤖");
        // Starting the server after successful database connection
        app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection failed☠️", err);
    });
