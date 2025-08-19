    import employeeModel from "../models/employee.model.js";
    import bcrypt from "bcrypt";

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
        // to hash the password
        // bcrypt is used to hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //Store the data in database
        const employeeData = await employeeModel.create({
        name,
        email,
        designation,
        department,
        userType,
        salary,
        password: hashedPassword,
        });
        //Send successful message
        return res.status(201).json({
        message: "Employee created successfully",
        data: employeeData,
        });
    } catch (error) {
        // if any error occurs, send a response with the error message
        console.log("Error: ", error);
        res.status(500).json({
        message: "Internal server error.Please try again later.",
        });
    }
    }
    // Function to get all employees
    export async function getAllEmployees(req, res) {
    try {
        const allEmployee = await employeeModel.find();
        if (allEmployee.length === 0) {
        return res.status(404).json({
            message: "No employees found.",
        });
        }
        return res.status(200).json({
        message: "All employees fetched successfully",
        data: allEmployee,
        });
    } catch (error) {
        console.log("Error while getting all employees: ", error);
        res.status(500).json({
        message: "Internal server error while fetching employees.",
        });
    }
    }

    // Function to get employees by ID
    export async function getEmployeesById(req, res) {
    try {
        // 1. Extract employee ID from request parameters (req.params.id).
        const id = req.params.id;

        // 2. Use EmployeeModel.findByID(id) to get the record.
        const employee = await employeeModel.findById(id);

        // 3. If the record is not found, return a 404 status with an error message.
        if (!employee) {
        return res.status(404).json({
            message: "Employee not found with this ID.",
        });
        }
        // 4. If the record is found, return a 200 status with the employee data.
        return res.status(200).json({
        message: "Employee data fetched successfully",
        data: employee,
        });
    } catch (error) {
        console.log("Error while getting employee by ID: ", error);
        res.status(500).json({
        message: "Internal server error while fetching employee by ID.",
        });
    }
    }


    // function to update employee data
    // This function updates an employee's data based on the provided ID and request body.


//Function to Update Employee data
export async function updateEmployee(req, res) {
  try {
    let hashedPassword;
    //kun employee ko data update garne ho
    const id = req.params.id;

    //kk update garne ho
    const { name, email, designation, department, userType, salary, password } =
      req.body;



      if(password){
      hashedPassword = await bcrypt.hash(password, 10)
      }
    //la data update garne
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { name, email, designation, department, userType, salary, password :hashedPassword},
      { new: true }
    );

    //message pathaune

    res
      .status(200)
      .json({ message: "Employee Data is updated.", data: updatedEmployee });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists." });
    }
    console.log("Error while updating data.", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
    // function to delete employee data



export async function deleteEmployee(req,res){
    try {
        const id=req.params.id;

      const deletedEmployee =  await employeeModel.findByIdAndDelete(id);

      if(!deletedEmployee){
        return res.status(404).json({message:"Employee to be deleted not found."})
      }
    res.status(200).json({message:"Employee data deleted", data:deletedEmployee})
    } catch (error) {
        console.log("Error while deleting data.", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}
