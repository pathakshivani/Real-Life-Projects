const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure .env is loaded

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ error: "Access Denied: No token provided" });
        }

        //  Verify JWT token
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }

            req.user = decoded;
            req.role = decoded.role;  // Store user role
            req.userId = decoded.userId; // Store user ID
            console.log(decoded);
            
            next(); // Continue to the next middleware/controller
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { authenticateUser };
