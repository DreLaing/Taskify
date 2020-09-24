const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    tasks: [{
        task:String,
        dueDate:{type:Date, default:Date.now},
        dateCreated:{type:Date, default:Date.now},
        project:{type:String, default:'General'}
    }],
    completedTasks:[{
        task:String,
        dueDate:{type:Date},
        dateCreated:{type:Date},
        dateCompleted:{type:Date, default:Date.now},
        project:{type:String, default:'General'}
    }],
    projects:[{type:String, unique:true}]
})

const User = mongoose.model('User', userSchema)
module.exports = User