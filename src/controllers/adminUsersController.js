const { organizationModel } = require("../models/adminModel");
const { userDetailsModel } = require("../models/userModel");
const { validationResult } = require('express-validator');

//all organizations
const getAllOrganizations = async (req, res) => {
    try {
        const getAllOrganizationsData = await organizationModel.find()
        res.status(200).json({ getAllOrganizationsData })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//create organizations
const createUsers = async (req, res) => {
    const { role, email, password } = req.body
    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const newUserData = await userDetailsModel.newUser(role, email, password)
        res.status(200).json({
            message: 'Signup successful',
            newUserData
        })

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = {
    getAllOrganizations,
    createUsers
}