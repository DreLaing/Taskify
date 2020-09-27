const mongoose = require('mongoose')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// GET PROJECTS
router.get('/:id/projects', (req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user.projects))
    .catch(err => res.json(err))
})

// NEW PROJECT
router.post('/:id/projects/add', (req,res)=>{
    User.findByIdAndUpdate(req.params.id)
    .then(user =>{
        uniqueProject = user.projects.filter(project => project == req.body.project)
        if(uniqueProject.length > 0){
            console.log(uniqueProject)
            res.status(203).json('Project must be unique')
        }
        else{
            user.projects.unshift(req.body.project)
            user.save()
            res.json(user)
        }
    })
    .catch(err => res.json(`ERROR: ${err}`))
})

// ADD TASK
router.route('/:id/add').post((req,res)=>{
    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        if(req.body.date){
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
        }
        else{
            if(req.body.project){
                user.tasks.unshift({ 
                    task: req.body.task,
                    project: req.body.project
                 })
                 user.save((err)=>{console.log(`USER ERROR: ${err}`)})
                 const response={tasks: user.tasks}
                 res.status(200).json(response)
            }
            else{
                user.tasks.unshift({ 
                    task: req.body.task,
                 })
                 user.save((err)=>{console.log(`USER ERROR: ${err}`)})
                 const response={tasks: user.tasks}
                 res.status(200).json(response)
            }
        }

        
        
    })
    .catch(err => res.json(`Error: ${err}`))
})

// USER TASKS
router.get('/:id', (req,res)=>{
    User.findById(req.params.id)
    .then(user => {
        res.json({
            tasks: user.tasks,
            completedTasks: user.completedTasks,
            projects: user.projects
        })
    })
    .catch(err => res.json(err))
})

// USER PROJECT TASKS
router.route('/:id/:project').get((req,res)=>{
    User.findById(req.params.id)
    .then(user =>{
        let completedTasks = user.completedTasks.filter(task => task.project===req.params.project)
        let tasks = user.tasks.filter(task => task.project===req.params.project)
        let response = {
            projects: user.projects,
            tasks,
            completedTasks
        }
        res.json(response)
    })
    .catch(err => res.json(`ERROR: ${err}`))
})

// UPDATE TASK
router.post('/:id/update/:task', (req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;
    User.findById(req.params.id)
    .then(result =>{   
        let task = result.tasks.id(req.params.task)
        task.task = req.body.task
        if(req.body.date){
            task.dueDate = req.body.date
        }
        result.save()
        res.json(task)
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
        result.completedTasks.pull(req.params.task)
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
        let completedTasks = result.completedTasks
        projects = projects.filter(project => project!==req.params.project)
        tasks = tasks.filter(task => task.project!==req.params.project)
        completedTasks = completedTasks.filter(task => task.project!==req.params.project)
        result.tasks = tasks
        result.projects = projects
        result.completedTasks = completedTasks
        result.save()
        res.json(result)
    })
    .catch(err => res.json(err))
})


module.exports = router