const access = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(403).json({ error: "Unauthorized: Role not found" });
        }

        if (allowedRoles.includes(req.role)) {
            next(); // User has access, proceed to the next middleware/controller
        } else {
            res.status(403).json({ error: `Access Denied: Only roles ${allowedRoles} can access this route` });
            console.log(`Access Denied: Only roles ${allowedRoles} can access this route` );
            
        }
        
    };
};

module.exports = { access };
