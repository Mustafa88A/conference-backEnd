//الي بي المشكله اذا خليت اليوزر و الادمن
const user = require("../models/UserSchema");
const admin = require("../models/AdminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// اذا خليت admin or payload يرجع توكن
exports.Token = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // استخراج التوكن

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    // التحقق من التوكن
    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // التحقق إذا كان المستخدم مسؤولًا
      if (payload.isAdmin) {
        const foundAdmin = await admin.findOne({ email: admin.email });
        console.log("found", admin.email);

        if (!foundAdmin) {
          return res.status(404).json({ message: "Admin does not exist" });
        }
        req.admin = foundAdmin; // تخزين المسؤول في الطلب
      } else {
        const foundUser = await user.findOne(payload.username);
        if (!foundUser) {
          return res.status(404).json({ message: "User does not exist" });
        }
        req.user = foundUser; // تخزين المستخدم في الطلب
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};

exports.authorizeRole = (isAdmin) => {
  return (req, res, next) => {
    if (req.isAdmin !== true) {
      return res
        .status(403)
        .json({ message: `Access denied for ${req.isAdmin}` });
    }
    next();
  };
};

const verifyAccessToken = async (token) => {
  try {
    // Verify the token using the provided secret key
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    console.log("4444", process.env.SECRET_KEY);
    // Return a success response with the decoded token data
    return { success: true, data: decodedData };
  } catch (error) {
    // If there's an error during token verification, return a failure response with the error message
    return { success: false, error: error.message };
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    // Extract the authorization header from the request
    const authHeader = req.headers["authorization"];
    // Extract the token from the authorization header if it exists
    const token = authHeader && authHeader.split(" ")[1];
    // If no token is provided, return a 401 (Unauthorized) response
    if (!token) {
      return res.status(401).json({ message: "Please log in to proceed" });
    }

    // Verify the token using the verifyAccessToken function
    const result = await verifyAccessToken(token);

    // If token verification fails, return a 403 (Forbidden) response with the error message
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    if (Date.now() > result.data.exp) {
      return res.sendStatus(401);
    }

    // Attach the decoded user data from the token to the request object
    req.user = result.data;
    // Call the next middleware in the chain
    next();
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// module.exports = { authenticateToken, authorizeRole };
