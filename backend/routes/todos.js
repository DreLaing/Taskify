const mongoose = require('mongoose')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/register', async (req,res) =>{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        username,
        password
    })
    newUser.save()
    .then(user => {
        responseUser={
            _id:user._id, 
            username: user.username, 
            projects:user.projects
        }
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(`${err}`)})
})

// NEW PROJECT
router.post('/:id/projects/add', (req,res)=>{
    User.findByIdAndUpdate(req.params.id)
    .then(user =>{
        user.projects.unshift(req.body.project)
        user.save()
        res.json(user)
    })
    .catch(err => res.json(`ERROR: ${err}`))
})

// ADD TASK
router.route('/:id/add').post((req,res)=>{
    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        if(req.body.project){
            user.tasks.unshift({ 
                task: req.body.task,
                dueDate: Date.parse(req.body.date),
                project: req.body.project
             })
             user.save((err)=>{console.log(`USER ERROR: ${err}`)})
             const response={tasks: user.tasks}
             res.status(200).json(response)
        }
        else{
            user.tasks.unshift({ 
                task: req.body.task,
                dueDate: Date.parse(req.body.date)
             })
             user.save((err)=>{console.log(`USER ERROR: ${err}`)})
             const response={tasks: user.tasks}
             res.status(200).json(response)
        }
        
    })
    .catch(err => res.json(`Error: ${err}`))
})

// USER TASKS
router.get('/:id', (req,res)=>{
    User.findById(req.params.id)
    .then(user => {
        res.json({
            tasks: user.tasks
        })
    })
    .catch(err => res.json(err))
})

// USER PROJECT TASKS
router.route('/:id/:project').get((req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;
    User.aggregate([
        {$match: {_id: ObjectId(req.params.id) }},
        {$unwind : "$tasks"},
        {$match: {"tasks.project" : req.params.project}}
    ])
    .then(user =>{
        tasks = []
        user.forEach(result => tasks.push(result.tasks))
        res.json(tasks)
    })
    .catch(err => res.json(`ERROR: ${err}`))
})

// UPDATE TASK
router.post('/:id/update/:task', (req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;
    User.aggregate([
        {$match: {_id: ObjectId(req.params.id) }},
        {$unwind : "$tasks"},
        {$match: {"tasks._id": ObjectId(req.params.task)}}
    ])
    .then(result =>{   
        result[0].tasks.task = req.body.task
        result[0].tasks.dueDate = req.body.date
        const response = {
            task: result[0].tasks
        }
        res.json(response.task)
        
    })
    .catch(err => res.json(err))
})

// MARK TASK AS COMPLETED
router.post('/:id/complete/:task', (req,res)=>{
    User.findById(req.params.id)
    .then(result =>{
        const completedTask = result.tasks.filter(task => task._id == req.params.task)
        result.tasks.pull(req.params.task)
        result.completedTasks.unshift(...completedTask)
        result.save()
        res.json(result)
    })
    .catch(err => res.json(err))
})

// DELETE TASK
router.delete('/:id/delete/:task', (req,res)=>{
    User.findById(req.params.id)
    .then(result=>{
        result.tasks.pull(req.params.task)
        result.save()
        res.json(result.tasks)
    })
    .catch(err => res.json(err))
})

// DELETE PROJECT
router.delete('/:id/delete/project/:project', (req,res)=>{
    User.findById(req.params.id)
    .then(result =>{
        let tasks = result.tasks
        let projects = result.projects
        projects = projects.filter(project => project!==req.params.project)
        tasks = tasks.filter(task => task.project!==req.params.project)
        result.tasks = tasks
        result.projects = projects
        result.save()
        res.json(result)
    })
    .catch(err => res.json(err))
})


module.exports = router