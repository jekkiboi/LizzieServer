const router = require('express').Router()
const db = require('../models')
//When the client logs in they will hit this route with 
//some data. Use that data to create a user in the database 
//if they aren't already there

router.post('/', async (req,res) => {
    const id = req.body.auth0Id


    //Two ways of doing a Mongoose Call
    //1. Callback mathod
    //db.User.fondOne({}, (err, foundUser) => {

    //})

    //2. async / await
    //step1: find if user exists
    const user = await db.User.findOne({ auth0Id: id })
   
    if(!user){
    //step 2: Create user if doesn't exist
        const newlyCreatedUser = await db.User.create({ auth0Id: id })
        console.log(newlyCreatedUser)
    }

    //Find if a user exists with this auth0Id
    //Create User if doesn't exist
    res.json ({msg: "O hi, thanks for visiting the /auth route!"})
})


module.exports = router