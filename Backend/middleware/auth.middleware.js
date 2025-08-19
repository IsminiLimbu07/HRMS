    import jwt from "jsonwebtoken";

    export function authorizeToken(req, res, next) {
    // Extract token from headers
    const authHeader = req.headers.authorization;

    // check if token is available
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(400).json({ messgae: "TOken is not provided" });
    }

    //split the token
    const token = authHeader.split(" ")[1];

    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        // if not verrifed then send error
        console.log("error while verifying token", error);
        res.status(400).json({ messgae: "Invalid token" });
<<<<<<< HEAD
    } 
=======
    }
>>>>>>> 4d3114e7ed1d38a3d115827c6e47a70b8cfcab1c
    }

    export function checkRole (req, res, next) {
        const user = req.user;
        const {userType} = user;
        if (userType.toLowerCase() === "employee") {
            return res.status(400).json({message: "Access Denied!"});
        
        }
        next ();
    }