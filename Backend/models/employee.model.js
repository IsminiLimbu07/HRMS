
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    name: String,
    email: String,
    designation: String,
    department: String,
    userType: String,
    salary: String,
    password: String,
}
,
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Creating a model from the schema
const employeeModel = model("Employee", employeeSchema);

export default employeeModel;
