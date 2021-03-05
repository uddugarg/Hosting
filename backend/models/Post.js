const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
        type: String
    },
    image:{
        type: String,
    },
    tags:{
        type: String,
    }
},{
    timestamps: true,
})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post}