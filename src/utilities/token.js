
const jwt = require("jsonwebtoken")

const createToken = ({_id, role}) => {
   // console.log('token', _id, role, email)
    return jwt.sign({_id, role}, process.env.JWT_TOKEN ,{
        expiresIn:"10d"
    })
}

module.exports = createToken