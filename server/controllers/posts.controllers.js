const posts = require('../models/posts.model')


const newPost = async (req, res) => {
  const { content, author } = req.body
  const newPost = new posts({
    content: content,
    author: author
  })
  try {
    await newPost.save()
    res.status(200).json({ success: "New post was Succesfully created" })
  }
  catch (error) {
    res.json(error)
  }
}

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await posts.find({}).populate({ path: 'author', select: ['name', 'avatar'] })
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

const getPostByID = async (req, res) => {
  const postid = req.params.id
  try {
    const post = await posts.findOne({ _id: postid }).populate({ path: 'author', select: ['name', 'avatar'] })
    res.status(200).json(post)
  }
  catch (err) {
    res.send(err)
  }
}

const likePost = async (req, res) => {
  const liker = req.params.id
  const post = req.params.post
  try {
    const didLike = await posts.findOne({ _id: post }).findOne({ likes: { $in: liker } })
    if (didLike) {
      const unlike = await posts.updateOne({ _id: post }, { $pull: { likes: liker } })
      await unlike.save()
      return res.json({ success: `unlike` })
    } else {
      const like = await posts.updateOne({ _id: post }, { $push: { likes: liker } })
      await like.save()
      return res.json({ success: `new like` })
    }

  }
  catch (err) {
    res.send(err)
  }
}
const newComment = async (req, res) => {
  const post = req.params.post
  const commenter = req.params.id
  const { content } = req.body
  try {
    const comment = await posts.updateOne({ _id: post }, { $push: { comments: { commenter: commenter, content: content } } })
    await comment.save()
    res.json({ success: `new comment` })
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
  newComment
}