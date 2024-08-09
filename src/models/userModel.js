
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// organization schema
const organizationSchema = mongoose.Schema({
    organizationName:{
        type:String,
        required:true
    }

},
{ timestamp: true }
)

const authUserSchema = mongoose.Schema({
    role:{
        type:String,
        enum:['user','manager'],
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



// users static signup function
authUserSchema.statics.signup = async ( email, password) => {

    const exists = await userDetailsModel.findOne({ email })
    if (exists) {
        throw Error(`Email already exists !`)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userSignup = await userDetailsModel.create({ email, password: hash })

    return userSignup
}


// users static login function
authUserSchema.statics.login = async  (email, password) => {
    // Check if user exists
    const userLogin = await userDetailsModel.findOne({ email });
    if (!userLogin) {
        throw Error("Incorrect Email!");
    }

    // Compare password
    const match = await bcrypt.compare(password, userLogin.password);
    if (!match) {
        throw Error("Incorrect password!");
    }
    return userLogin;
};

const adminDetailsModel  = new mongoose.model("adminDetails", authUserSchema)

const userDetailsModel  = new mongoose.model("userDetails", authUserSchema)

const organizationModel  = new mongoose.model("organizations", organizationSchema)

module.exports = {
    adminDetailsModel,
    userDetailsModel,
    organizationModel
}