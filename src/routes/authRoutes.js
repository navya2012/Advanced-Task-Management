
const express = require("express")
const router = express.Router()

const { signupValidation, userSignupDetails, userLoginDetails } = require("../controllers/userDetailsController")
const {   adminMiddleware } = require("../middlewares/authMiddleware")
const {  createOrganizations, getAllOrganizations } = require("../controllers/adminController")
const { createUsers, getAllUsers } = require("../controllers/adminUsersController")



router.post('/auth/admin/signup', signupValidation, userSignupDetails)
router.post('/auth/admin/login', userLoginDetails)

//admin
router.get('/admin/all-Organizations', adminMiddleware, getAllOrganizations)
router.post('/admin/organizations',  adminMiddleware, createOrganizations )

// admin users
router.post('/admin/create-users',  adminMiddleware, createUsers )
router.get('/admin/all-users',  adminMiddleware, getAllUsers )

module.exports = router