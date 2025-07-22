    import express from "express";
    import morgan from "morgan";
    import mongoose from "mongoose"; //importing mongoose for database connection

    import dotenv from "dotenv";
    import {
    createEmployee,
    getAllEmployees,
    getEmployeesById,
    } from "./controllers/employee.controller.js";

    dotenv.config(); // configuring .env file

    const app = express();
    const PORT = process.env.PORT;

    // for logging information
    app.use(morgan("dev"));
    app.use(express.json());

    // Creating Route
    app.get("/dharan", (req, res) => {
    res.status(200).json({ message: "Welcome to Dharan" });
    });

    app.post("/employee/create", createEmployee);
    app.get("/employee/getAllEmployees", getAllEmployees);
    app.get("/employee/getAllEmployeesById/:id", getEmployeesById);

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
