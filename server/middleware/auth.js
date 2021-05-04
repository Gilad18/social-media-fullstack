const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

const auth = async (req,res,next) => {
      try {
          const token = req.header('Authorization').replace('Bearer ' , '')
          const decoded = jwt.verify(token, 'socialmedia')
          const user = await User.findOne({email : decoded.email, 'tokens.token' : token})

          if(!user) {
              throw new Error('Please authenticate')
          }
          console.log(user)
          next()
      }
      catch(err) {
          res.status(401).send({err: 'Please authenticate'})
      }
  
}

module.exports = auth