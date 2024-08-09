
const express = require("express")
const router = express.Router()

const { createTasks, getTasks, deleteTasks, updateTasks } = require("../controllers/tasksController")
const { getAllTasks, updateTaskStatus } = require("../controllers/userController")


//user
router.get('/user/all-tasks',   getAllTasks)
router.patch('/user/update-tasks/:id', updateTaskStatus)

//tasks
router.post('/manager/create-tasks',  createTasks)
router.get('/manager/tasks',   getTasks)
router.delete('/manager/delete-tasks/:id', deleteTasks)
router.patch('/manager/update-tasks/:id', updateTasks)


module.exports = router