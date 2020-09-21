const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    projectName:{type:String, unique:true, default:'General Tasks'},
    tasks:[{
        task:String,
        dueDate:{type:Date},
        dateCreated:{type:Date, default:Date.now}
    }]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project