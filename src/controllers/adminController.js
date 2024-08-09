const {  organizationModel } = require("../models/adminModel");


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
const createOrganizations = async (req,res) => {
    const { organizationName } = req.body
    try{
        const existingOrganization = await organizationModel.findOne({ organizationName });

        if (existingOrganization) {
          return res.status(400).json({ error: "Organization already exists" });
        }
        
        const organizationData = new organizationModel({organizationName})
        await organizationData.save()

        res.status(201).json({ message: "Posted Successfully", organizationData })

    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


module.exports={
    getAllOrganizations,
    createOrganizations
}