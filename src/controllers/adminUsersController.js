const { organizationModel } = require("../models/adminModel");
const { userDetailsModel } = require("../models/userModel");
const { validationResult } = require('express-validator');

//all organizations
const getAllUsers = async (req, res) => {
    try {
        const getAllUsersData = await userDetailsModel.find()
        res.status(200).json({ getAllUsersData })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//create organizations
const createUsers = async (req, res) => {
    const { role, email, password , organizationName} = req.body
    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

            
        const organization = await organizationModel.findOne({ organizationName });
        if (!organization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        // Use the organization ID from the found organization
        const organization_id = organization._id;
        console.log(organization_id, typeof organization_id)

        const newUserData = await userDetailsModel.newUser(role, email, password,organization_id)
        res.status(200).json({
            message: 'Created Users',
            newUserData
        })

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = {
    getAllUsers,
    createUsers
}