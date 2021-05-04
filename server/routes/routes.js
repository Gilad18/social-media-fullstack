const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth')
const router = express.Router();
const users = require('../models/users.model')
const usersControllers = require('../controllers/users.controllers')
const postsControllers = require('../controllers/posts.controllers')

router.post('/signin' , (req,res) => {
    usersControllers.createNewUser(req,res)
}).post('/login' , (req,res)=> {
usersControllers.loginUser(req,res)
}).post('/profile/newpost' , (req,res) => {
    postsControllers.newPost(req,res)
}).get('/users', auth , (req,res)=> {
    usersControllers.getAllUsers(req,res)
}).get('/post/:id' , (req,res)=> {
    postsControllers.getPostByID(req,res)
}).get('/profile/:id' , (req,res)=> {
    usersControllers.getUserByID(req,res)                 
}).put('/:id/:post/like' , (req,res) => {
    postsControllers.likePost(req,res)
}).put('/:id/:post/comment' , (req,res)=> {
    postsControllers.newComment(req,res)
}).put('/:follower/:following/follow' , (req,res) => {
    usersControllers.follow(req,res)
}).get('/posts' , (req,res) => {
    postsControllers.getAllPosts(req,res)
})



const upload = multer({
    limits : {
        fileSize :3000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined,true)
    }
})

router.post('/:id/uploadpic' , upload.single('avatar') , async (req,res) => {
    try {
        const user = await users.findOneAndUpdate({_id : req.params.id},{$set :{ "avatar" : req.file.buffer}})
        await user.save()
        res.json({succes : 'Image was usccesfully uploaded'})
    }
    catch(err) {
        res.send(err)
    }
   
})





module.exports = router;