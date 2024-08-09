const { tasksModel } = require("../models/tasksModel")


// create tasks
const createTasks = async (req,res) => {
    const { title, description, status, dueDate} = req.body
    const manager_id = req.user._id
    const organization_id = req.user.organization._id

    try{
        const tasksFields ={ manager_id, title, description, status, dueDate, organization_id }
        const tasksData = new tasksModel(tasksFields)
        await tasksData.save()

        res.status(201).json({ message: "Posted Successfully", tasksData })

    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


// get tasks
const getTasks = async (req,res) => {
    try{
        const getTasksData = await tasksModel.find()
        res.status(200).json({ getTasksData })

    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}

// create tasks
const updateTasks = async (req,res) => {
    const task_id = req.params.id
    const { title, description, status, dueDate} = req.body
    try{
        if (!task_id) {
            return res.status(404).json({ error: 'task ID is not provided' });
        }

        const updateTasksFields = { title, description, status, dueDate }
        const updatedTasksData = await tasksModel.findOneAndUpdate(
            { _id: task_id },
            { $set: updateTasksFields },
            { new: true }
        );

        if (!updatedTasksData) {
            return res.status(404).json({ error: "Job post not found" });
        }

        res.status(200).json({ message: "Updated Job Post Successfully", updatedTasksData });
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}

// delete tasks
const deleteTasks = async (req,res) => {
    const id = req.params.id
    const manager_id = req.user._id
    try{
        const result = await tasksModel.findOneAndDelete({
            _id: id,
            manager_id:manager_id
        });

        if (!result) {
            return res.status(404).json({ message: "task  not found" });
        }

        res.status(200).json({ message: " task successfully deleted." });
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


module.exports ={
    createTasks,
    getTasks,
    deleteTasks,
    updateTasks
}