
const jwt = require('jsonwebtoken')
const { userDetailsModel } = require('../models/userModel')


const adminMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: "Auth token is required" })
    }

    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {

        // checking token entered by user and generated at time of login is same or not 
        const { _id } = jwt.verify(token, process.env.JWT_TOKEN)
        if (!_id ) {
            return res.status(401).json({ error: "Invalid token" });
        }

        //checking id is present in db or not- only checking id     
        req.userDetails = await userDetailsModel.findById(_id);
        if (!req.userDetails) {
            return res.status(401).json({ error: `admin Id not found` });
        }

        //after checking move to next operations
        next()
    }
    catch (err) {
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = {
    adminMiddleware,
}