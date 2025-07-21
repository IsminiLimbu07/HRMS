    import employeeModel from "../models/employee.model.js";

    export async function createEmployee(req, res) {
    try {
        // 1. Extract data from employee
        // k k data liney ho tyo yaha lineyy
        const { name, email, designation, department, userType, salary, password } =
        req.body;

        // Validate the data such as email, password, name and all
        if (
        !name ||
        !email ||
        !designation ||
        !department ||
        !userType ||
        !salary ||
        !password
        ) {
        return res.status(400).json({
            message: "All the fields are required😉",
        });
        }

        //Check if email already in db
        const isEmailExist = await employeeModel.findOne({ email });
        if (isEmailExist) {
        return res.status(400).json({
            message: "This email already exists. Please try another one.",
        });
        }
        //Store the data in database
        const employeeData = await employeeModel.create({
        name,
        email,
        designation,
        department,
        userType,
        salary,
        password,
        });
        //Send successful message
        return res.status(201).json({
        message: "Employee created successfully",
        });
    } catch (error) {
        // if any error occurs, send a response with the error message
        console.log("Error: ", error);
        res.status(500).json({
        message: "Internal server error.Please try again later.",
        });
    }
    }
