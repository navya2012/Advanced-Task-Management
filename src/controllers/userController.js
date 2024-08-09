
const { tasksModel } = require("../models/tasksModel");


const getAllTasks = async(req,res) =>{
    try{
        const getAllTasks = await tasksModel.find()
        res.status(200).json({ getAllTasks })

     } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// status update
const updateTaskStatus = async (req, res) => {
    const task_id = req.params.id
    const user_id = req.user._id
    try {

        if (!task_id) {
            return res.status(404).json({ error: 'task ID is not provided' });
        }

        const updatedTaskStatusData = await tasksModel.findOneAndUpdate(
            { _id: task_id, },
            {
                $set: {
                    status:'completed',
                    userId:user_id
                }
            },
            { new: true }
        );

        if (!updatedTaskStatusData) {
            return res.status(404).json({ error: "task not found" });
        }

        res.status(200).json({
            _id: task_id,
            updatedTaskStatusData,
            message: 'status changed'
        });

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports={
    getAllTasks,
    updateTaskStatus
}