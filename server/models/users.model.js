const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator');
// const { type } = require('os');

const userSchema = mongoose.Schema({
       name : {
        type : String,
        required : true,
        unique: false,
        validate(value) {
            if(value.length < 3) {
                throw new Error('too short')
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique :true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('invalid Adress')
            }
        }
    },
    password : {
        type : String,
        required :true,
        unique : true,
        validate(value) {
            if(value.length < 5) {
                throw new Error('too short (Minimun 5 chars)')
            }
        }
    },
    joined : {
        type : Date,
        required : false,
        unique : false,
        default : Date.now
    },
    location : {
        type : String,
        required :false,
        unique : false
    },
    avatar : {
        type : Buffer
    },
     following :[{type : mongoose.Schema.Types.ObjectId,ref : 'users'}]
    ,followers :[{type : mongoose.Schema.Types.ObjectId,ref : 'users'}]
    ,tokens :[{
        token : {
            type: String,
            required: true
        }
    }],
    notification : [String]
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({email : user.email} , 'socialmedia',{expiresIn:'4h'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (givenEmail,givenPassword) => {
    const user = await userModel.findOne({email:givenEmail})

    if(!user) {
        throw new  Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(givenPassword , user.password)

    if(!isMatch) {
        throw new Error('Unable to Login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this
 
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
 
    next()
 })

const userModel  = mongoose.model('users',userSchema);
module.exports= userModel;