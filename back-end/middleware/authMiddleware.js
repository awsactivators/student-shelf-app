const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {User} = require("../models");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Extracted Token:", token);

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ["password"] }
            });

            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            next();
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        console.error("No token found in request headers");
        res.status(401);
        throw new Error("Not authorized, no token");
    }


    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error("Admin access only");
    }
  };

module.exports = { protect, adminOnly };
