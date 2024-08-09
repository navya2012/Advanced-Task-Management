const { check, validationResult } = require('express-validator');
const { adminDetailsModel } = require('../models/adminModel');
const createToken = require('../utilities/token');


// Validation rules for sign-up
const signupValidation = [
    check('email').optional().trim()
    .customSanitizer(value => value.toLowerCase()) 
    .isEmail().withMessage('Invalid email address'),
    check('password').optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
];

//user sign up
const userSignupDetails = async (req, res) => {
    const { email, password} = req.body

    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // store data into db+
        const signUpDetails = await adminDetailsModel.signup( email, password )
        res.status(200).json({ 
            message: 'Signup successful' ,  
            signUpDetails
            })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//login
const userLoginDetails = async (req, res) => {
    const { email, password } = req.body;

    try {
        // store data into db+
        const loginDetails = await adminDetailsModel.login(email, password);

        //token
        const token =  createToken({ _id: loginDetails._id });

        res.status(200).json({ 
            message: "Successfully Logged In",
            loginDetails,
                    token     
         });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    userSignupDetails,
    userLoginDetails,
    signupValidation
}