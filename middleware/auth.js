const admin = require("../models/AdminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authenticateAdmin = async (req, res, next) => {
  try {
    const foundAdmin = await admin.findOne({ email: req.body.email });
    if (!foundAdmin) {
      const error = new Error("email doesn't exist");

      error.status = 404;

      return next(error);
    }
    console.log("5555", foundAdmin);

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      foundAdmin.password
    );

    if (!comparedPassword) {
      const error = new Error("Incorrect username or password");
      error.status = 400;
      return next(error);
    }
    req.admin = foundAdmin;
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const verifyAccessToken = async (token) => {
  try {
    // Verify the token using the provided secret key
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    console.log(process.env.SECRET_KEY);
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
