    import employeeModal from "../models/employee.model.js";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";
    

    export async function loginEmployee(req, res) {
    try {
        const { email, password } = req.body;
        console.log("Login attempt with email:", email);

        if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and Password are required!" });
        }

        const user = await employeeModal.findOne({ email });

        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password!" });
        }

        const token = jwt.sign(
        {
            id: user._id,
            userType: user.userType,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
        );

        res.status(200).json({message:'Login Successfull',
            token: token,
            user: {
                _id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                userType: user.userType
            },
        })
    } catch (error) {
        console.log("Errror while login:"), error;
        req.status(500).json({ message: "Internal server error!" });
    }
    }
