const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: false,
        validate(value) {
            if(value.length < 2) {
                throw new Error('Name is too short')
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique :true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email Adress')
            }
        }
    },
    password : {
        type : String,
        required :true,
        unique : true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Password must be min 8 chars and include at least 1 Upper,lower,num and symbol')
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
    }]
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({email : user.email} , 'socialmedia',{expiresIn:'2h'})
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