const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'users',
    },
    content: {
        type: String,
        required: true,
        unique: false,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    comments: [
        {
            commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
            content: String,
            onDate :{type: Date, required: false, unique: false, default: Date.now}
        }],
    image: {
        type: Buffer,
        required: false,
        unique: false
    },
    date: {
        type: Date,
        required: false,
        unique: false,
        default: Date.now
    }
})

const userModel = mongoose.model('posts', postSchema);
module.exports = userModel;