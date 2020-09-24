const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

//LOGIN
router.post('/', async (req,res) =>{
    const username = req.body.username;
    User.find({username: username})
    .then(queryUser => {
        if(queryUser.length!==0){
            console.log(queryUser)
            bcrypt.compare(req.body.password, queryUser[0].password, (err, isMatch) =>{               
                if(!isMatch){
                    res.status(203).json('Wrong password')
                }
                else{
                    const token = jwt.sign({
                        userID: queryUser[0]._id
                    }, process.env.JWT_SIGN, {
                        expiresIn:'3h'
                    })
                    res.json(token)
                }                  
            })
        }
        else{
            res.status(404).json('No registered user with that username')
        }})
    .catch(err => res.status(404).json('error'))
})

// REGISTER
router.post('/register', async (req,res) =>{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        username,
        password
    })
    newUser.save()
    .then(user => {
        const token = jwt.sign({
            userID: user._id
        }, process.env.JWT_SIGN,{
            expiresIn: '3h'
        })
        console.log(token)
        res.status(200).json(token)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(`${err}`)})
})
module.exports = router