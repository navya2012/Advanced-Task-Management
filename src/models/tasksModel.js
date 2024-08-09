
const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    },
    dueDate:{
        type:Date
    },
    userId:{
        type:String,
        default:null
    },
    organization_id:{
        type:String
    },
    manager_id:{
        type:String
    }
})


const tasksModel  = new mongoose.model("tasks", tasksSchema)

module.exports = {
    tasksModel
}