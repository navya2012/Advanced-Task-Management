
const jwt = require('jsonwebtoken')
const {  adminDetailsModel } = require('../models/adminModel')


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
        const { _id } = jwt.verify(token, process.env.JWT_TOKEN)
        if (!_id ) {
            return res.status(401).json({ error: "Invalid token" });
        }    
        req.userDetails = await adminDetailsModel.findById(_id);
        if (!req.userDetails) {
            return res.status(401).json({ error: `admin Id not found` });
        }

       console.log("middleware", req.userDetails)
        next()
    }
    catch (err) {
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = {
    adminMiddleware,
}