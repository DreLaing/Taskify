const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/', async (req,res) =>{
    const username = req.body.username;
    let user;
    User.find({username: username})
    .then(queryUser => {
        if(queryUser.length!==0){
            console.log(queryUser)
            user = queryUser
            bcrypt.compare(req.body.password, user[0].password, (err, isMatch) =>{
                
                if(!isMatch){
                    res.status(203).json('Wrong password')
                }
                else{
                    const token = jwt.sign({
                        userID: queryUser._id
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