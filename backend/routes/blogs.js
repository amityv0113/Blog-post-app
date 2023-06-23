const express = require('express')
const router =express.Router()
const fetchuser = require('../middleware/fetchuser')
const {body, validationResult } = require('express-validator')
const Blog = require('../models/Blog')

//Route 1: Get all blog posts fom blogs 
router.get('/fetchallblogs',fetchuser, async (request,response)=>{
    
    try{
        const blogs = await Blog.find({})
        response.json(blogs)

    }catch(err){
        onsole.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }
})
//Route 2: Get all blogs for specific user 
router.get('/fetchallblogsforuser',fetchuser, async (request,response)=>{
    
    try{
        const blogs = await Blog.find({user:request.user.id})
        response.json(blogs)

    }catch(e){
        onsole.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }
})

// Route 3: create blogs for specific user 
router.post('/createblog', fetchuser,[
    body('title','enter valid title').isLength( {min:3}),
    body('discription','discription must be atleast 5 characters').isLength( {min:5}),
    ] ,
    async(request, response)=>{
    const { title,discription, categories} = request.body

    // if there are errors, return bad request and the errors
    const errors=validationResult(request)
    if (!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()})
    }
    try{
        const blog=new Blog({
            title,discription,categories, user:request.user.id
        })
        const saveBlog = await blog.save()
        response.json(saveBlog)
    }catch(e){
        onsole.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }
})

//Route 3: update existing blog
router.put('/updateblog/:id', fetchuser,[
    body('title','enter valid title').isLength( {min:3}),
    body('discription','discription must be atleast 5 characters').isLength( {min:5}),
    ] ,
    async(request, response)=>{
    const { title,discription, categories} = request.body

    // if there are errors, return bad request and the errors
    const errors=validationResult(request)
    if (!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()})
    }
    try{
        let blog=await Blog.findById(request.params.id)
        if (!blog)
        {
            return response.status(404).send("Not Found")
        }
        if (blog.user.toString()!==request.user.id)
        {
            return response.status(401).send("Not Allowed")
        }
        
        const newblog={
            title:title,
            discription:discription,
            categories:categories

        }
        blog = await Blog.findByIdAndUpdate(request.params.id,{$set:newblog},{new:true}) 
        response.json({blog:blog})

    }catch(e){
        console.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }
})

//Route 4: Delete specific blogs for specific user 
router.delete('/deleteblog/:id',fetchuser, async (request,response)=>{
    
    try{
        //find the blog to be delete 
        let blog = await Blog.findById(request.params.id)
        if (!blog)
        {
            return response.status(404).send("Not Found") 
        }
        if (blog.user.toString()!==request.user.id)
        {
            return response.status(401).send("Not Allowed")
        }
        blog = await Blog.findByIdAndDelete(request.params.id)
        response.json({"success":"blog has been deleted",blog:blog})
    }catch(e){
        console.error(e.message)
        response.status(500).send("Some error occurred:" + e)
    }
})


module.exports = router