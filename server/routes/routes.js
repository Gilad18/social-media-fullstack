const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth')
const newFile = require('../middleware/newFIle')
const router = express.Router();
const users = require('../models/users.model')
const usersControllers = require('../controllers/users.controllers')
const postsControllers = require('../controllers/posts.controllers')

router.post('/signin' , (req,res) => {
    usersControllers.createNewUser(req,res)
}).post('/login' , (req,res)=> {
usersControllers.loginUser(req,res)
}).post('/profile/newpost' ,auth , newFile.single('image') ,(req,res) => {
    postsControllers.newPost(req,res)
}).get('/users' , (req,res)=> {
    usersControllers.getAllUsers(req,res)
}).get('/post/:id' , (req,res)=> {
    postsControllers.getPostByID(req,res)
}).get('/profile/:id' , (req,res)=> {
    usersControllers.getUserByID(req,res)                 
}).put('/:post/like' , auth , (req,res) => {
    postsControllers.likePost(req,res)
}).put('/:post/comment' , auth,(req,res)=> {
    postsControllers.newComment(req,res)
}).put('/:id/follow' ,auth , (req,res) => {
    usersControllers.follow(req,res)
}).get('/posts' , (req,res) => {
    postsControllers.getAllPosts(req,res)
}).put('/clearNotification', auth , (req,res) => {
    usersControllers.clearNotification(req,res)
}).get('/getnotes' , auth , (req,res ) => {
    usersControllers.getNotificiation(req,res)
}).get('/mayknow' , auth , (req,res) => {
    usersControllers.mayKnow(req,res)
}).get('/posts/relevant' , auth , (req,res) => {
    postsControllers.getRelevantPosts(req,res)
}).put('/profile/logout' , auth , (req,res) => {
    usersControllers.logout(req,res)
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