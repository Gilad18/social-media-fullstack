const users = require('../models/users.model')

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body
  const newUser = new users({
    name : name ,
    email: email,
    password: password,
    notification : [`Hey ${name.split(' ')[0]}, welcome to social club`]   // see how you add to default in schema
  })
  try {
    const token = await newUser.generateToken()
    await newUser.save()
    res.status(200).json({ success: "New Account was Succesfully created", token , newUser })
  }
  catch (error) {
    res.status(400).json({error} )
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await users.findByCredentials(email, password)
    const token = await user.generateToken()
    res.status(200).json({user , token })
  }
  catch (err) {
    res.status(400).json({ error: "Incorrect Inputs" })
  }

}

const logout = async (req,res) => {
   const user = req.user
   try {
     await user.updateOne({$set :{tokens : []}})
     user.save()
     res.status(200).json({success: 'You are now logged out, hope to see you soon'})
   }
   catch(err) {
     res.json(err)
   }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find({})
    res.send(allUsers)
  }
  catch (err) {
    res.send(err)
  }
}

const getUserByID = async (req, res) => {
  const id = req.params.id
  try {
    const user = await users.findOne({ _id: id }).populate({ path: 'following', select: ['name', 'avatar'] })
      .populate({ path: 'followers', select: ['name', 'avatar'] }).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs)
      })
  }
  catch (err) {
    res.status(400).json({ error: "user does not exist" })
  }

}

const follow = async (req, res) => {                     //is there a nicer way to write it?
  const follower = req.user
  const beingFollow = req.params.id
  
    try {
      const alredayFollowing = await users.findOne({ _id: follower.id }).findOne({ following: { $in: beingFollow } })
      if (!alredayFollowing) {
        const followUser = await users.updateOne({ _id: follower.id }, { $push: { following: beingFollow } })
        const followingUser = await users.updateOne({ _id: beingFollow }, { $push: { followers: follower.id }})
        const notify = await users.updateOne({ _id: beingFollow }, { $push:  {notification : `${req.user.name} started following you`}})
        await followUser.save()
        await followingUser.save()
        await notify.save()
        return res.json({ success: 'following success' })
      } else {
        const unFollowUser = await users.updateOne({ _id: follower.id }, { $pull: { following: beingFollow } })
        const unFollowingUser = await users.updateOne({ _id: beingFollow }, { $pull: { followers: follower.id } })
        await unFollowUser.save()
        await unFollowingUser.save()
        return res.json({ success: 'unfollowing success' })
      }
    }
    catch (err) {
      res.send(err)
    }
  // }
  // return res.json({error : 'self-follow?! seriously?'})
}

const getNotificiation =  (req ,res) => {
  const notes = req.user.notification
  return res.json(notes)
}

const clearNotification = async (req,res) => {
    await req.user.updateOne({ $set : {'notification': [] }} , {multi:true})
    return res.status(200).json({msg : 'Clear Notification'})
}

const mayKnow = async (req,res) => {
  const list = req.user.following           //exclude the requesting user from the list
  list.push(req.user._id)
  const notFollowing = await users.find({_id : {$nin :list}},{_id:1,name:1,followers:1,avatar:1}).limit(2)
  res.send(notFollowing)
}


module.exports = {
  createNewUser,
  loginUser,
  logout,
  getAllUsers,
  getUserByID,
  follow,
  clearNotification,
  getNotificiation,
  mayKnow
}