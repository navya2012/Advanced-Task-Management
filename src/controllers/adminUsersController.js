const { userDetailsModel, organizationModel } = require("../models/userModel");


//all organizations
const getAllOrganizations = async(req,res) =>{
    try{
        const getAllOrganizationsData = await organizationModel.find()
        res.status(200).json({ getAllOrganizationsData })

     } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//create organizations
const createUsers = async (req,res) => {
    const { role, email, password } = req.body
    try{
        const usersData = new organizationModel({ role, email, password })
        await usersData.save()

        res.status(201).json({ message: "Posted Successfully", usersData })

    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


module.exports={
    getAllOrganizations,
    createUsers
}