const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

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
    .catch(err => `Error: ${err}`)
})
module.exports = router