
const posts = require('../models/posts.model')
const users = require('../models/users.model')
const sharp = require('sharp')

const newPost = async (req, res) => {
  const { content } = req.body
  const user = req.user

  const newPost = new posts({
    content: content,
    author: user.id
  })

  try {
    if (req.file) {
      let picture = await sharp(req.file.buffer).resize(320, 240).png().toBuffer()
      newPost.image = picture
    }
    await newPost.save()
    res.status(200).json({ success: "New post was Succesfully created" })
  }
  catch (error) {
    res.status(400).json({ error })
  }
}

const getAllPosts = (req, res) => {
  try {
    const allPosts = posts.find({}).populate({ path: 'author', select: ['name', 'avatar'] })
      .populate({ path: 'likes', select: ['name', 'avatar'] })
      .populate({ path: 'comments.commenter', select: ['name', 'avatar'] })
      .exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs)
      })
    console.log(allPosts)
  }
  catch (err) {
    res.send(err)
  }
}

const getRelevantPosts = async (req, res) => {        //get posts by people ypu follow from sorted from newest to latest
  const list = req.user.following
  list.push(req.user.id)
  const skip = parseInt(req.params.skip)
  try {
    posts.find({ author: { $in: list } }).sort({ date: -1 }).skip(skip).limit(10)
      .populate({ path: 'author', select: ['name', 'avatar'] })
      .populate({ path: 'likes', select: ['name', 'avatar'] })
      .populate({ path: 'comments.commenter', select: ['name', 'avatar'] })
      .exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs)
      })
  }
  catch (err) {
    res.json(err)
  }
}

const getRecent = async (req, res) => {
  const id = req.params.friend
  console.log(id)
  try {
    const post = await posts.findOne({ author: id })
      .populate({ path: 'likes', select: ['name', 'avatar'] })
      .populate({ path: 'comments.commenter', select: ['name', 'avatar'] })
      .exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs)
      })
  }
  catch (err) {
    res.json(err)
  }
}

const getPostByID = async (req, res) => {
  const postid = req.params.id
  try {
    posts.findOne({ _id: postid }).populate({ path: 'author', select: ['name', 'avatar'] })
      .populate({ path: 'likes', select: ['name', 'avatar'] })
      .populate({ path: 'comments.commenter', select: ['name', 'avatar'] })
      .exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs)
      })
  }
  catch (err) {
    res.send(err)
  }
}

const likePost = async (req, res) => {
  const liker = req.user
  const post = req.params.post
  try {
    const didLike = await posts.findOne({ _id: post }).findOne({ likes: { $in: liker.id } })
    if (didLike) {
      const unlike = await posts.updateOne({ _id: post }, { $pull: { likes: liker.id } })
      await unlike.save()
      return res.json({ success: `unlike` })
    } else {
      const like = await posts.updateOne({ _id: post }, { $push: { likes: liker.id } })
      const postOwner = await posts.findOne({ _id: post })
      const notify = await users.findOneAndUpdate({ _id: postOwner.author }, { $push: { notification: `${liker.name} liked your post ` } })
      await like.save()
      await notify.save()
      return res.json({ success: `new like` })
    }

  }
  catch (err) {
    res.send(err)
  }
}

const newComment = async (req, res) => {
  const post = req.params.post
  const commenter = req.user
  const { content } = req.body
  if (content.length < 1) {
    return res.status(400).json({ message: 'add text to your comment' })
  }
  try {
    await posts.updateOne({ _id: post }, { $push: { comments: { commenter: commenter.id, content: content } } })
      .populate({ path: 'commenter', select: ['name', 'avatar'] })
    const postOwner = await posts.findOne({ _id: post })
    const notify = await users.findOneAndUpdate({ _id: postOwner.author }, { $push: { notification: `${commenter.name} has commemted your post ` } })
    await notify.save()
    return res.status(200).json({ success: `new comment` })
  }
  catch (err) {
    res.send(err)
  }
}


module.exports = {
  newPost,
  getPostByID,
  getAllPosts,
  likePost,
  newComment,
  getRelevantPosts,
  getRecent
}