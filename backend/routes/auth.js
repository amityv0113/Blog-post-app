const express = require('express')
const router =express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const {body, validationResult } = require('express-validator')

const Users= require('../models/User')

//Route 1: create a new user using post request /api/auth/createuser
router.post('/createuser',[
    body('name').isLength( {min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:5})
],async (request,response)=>{
    let success =false
    // if there are errors return bad request and errors 
    const errors =validationResult(request)
    if (!errors.isEmpty())
    {
        return response.status(400).json({success,errors:errors.array()})
    }

    try{
        //  check whethe the user with this email exits already 
        let user =await Users.findOne({email:request.body.email})
        //console.log(user)
        if (user)
        {
            return response.status(400).json({success, error:"sorry a user with this email is already exist"})
        }
        // hash password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(request.body.password, salt)

        // create a new user
        user = await Users.create({
            name:request.body.name,
            email:request.body.email,
            password:hashPassword,
            
        })
        // jwt token is required for authentication purposes
        const privateKey = 'Amit@key'
        const data ={
            user:{
                id:user.id,
            }
        }
        const token = jwt.sign(data, privateKey);
        success=true
        response.json({success, authtoken:token})
    }catch(e){
        console.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }

})

//Route 2: authenticate login user using post request /api/auth/login

router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','password cannot be blank').exists(),
] , async (request, response) => {
    let success =false
    // if there is error, return bad request and the error 
    const errors = validationResult(request)
    if (!errors.isEmpty()){
        return response.status(400).json({success,errors:errors.array()})
    }

    const {email, password } = request.body 

    try{
        let user =await Users.findOne({email}) 
        if (!user){
            return response.status(400).json(
                { success,error:'please try to login with correct credentials'}
            )
        }
        const passwordCompare = await bcrypt.compare(password, user.password )
        if (!passwordCompare)
        {
            return response.status(400).json(
                { success,error:'please try to login with correct credentials'}
            )
        }

        // jwt token is required for authentication purposes
        const privateKey = 'Amit@key'
        const data ={
            user:{
                id:user.id,
            }
        }
        const token = jwt.sign(data, privateKey);
        success=true
        response.json({success,authtoken:token})
    }catch(e){
        console.error(e.message)
        response.status(500).send("Internal server error")
    }
})

router.post('/getuser', fetchuser,async (request,response) => {
    try {
        const userId = request.user.id
        const user =await Users.findById(userId)
        response.send(user)

    }catch(e) {
        console.error(e.message)
        response.status(500).send("Internal server error")
    }
})

module.exports = router