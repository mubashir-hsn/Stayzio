import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

// Middleware to verify the JWT token from cookies and set user role
const verifyToken = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.jwt;

        // If no token is provided, deny access
        if (!token) {
            return res.status(401).send({ message: 'No token, authorization denied.' });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

        // Ensure the decoded token contains the userId
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ message: 'Invalid token.' });
        }

        // Find the user by decoded userId and exclude the password field
        const user = await User.findById(decoded.userId).select('-password');

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Attach user and role to the request
        req.user = user;
        req.role = user.role; // Assuming `user.role` contains the role (e.g., "admin")

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in verifyToken middleware:", error);

        // Handle specific JWT token errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token.' });
        }

        // Handle expired token error
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired.' });
        }

        // Return a generic error for any other issue
        return res.status(500).send({ message: 'Internal server error.' });
    }
};

export default verifyToken;
