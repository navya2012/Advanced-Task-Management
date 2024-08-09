
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    role:{
        type:String,
        enum:['user','manager'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 8
    }
},
{ timestamp: true }
)

// // users static signup function
usersSchema.statics.newUser = async (role, email, password) => {

    const exists = await userDetailsModel.findOne({ email })
    if (exists) {
        throw Error(`Email already exists !`)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUserDetails = await userDetailsModel.create({role, email, password: hash })

    return newUserDetails
}


const userDetailsModel  = new mongoose.model("userDetails", usersSchema)

module.exports = {
userDetailsModel
}