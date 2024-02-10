const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true  
     },
     body: {
        type: String,
        required: true
     },
     device: {
        type: String,
        enum: ['PC' , 'TABLET' , 'MOBILE'],
        required: true
     },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     }
});

const PostModel = mongoose.model("post" , postSchema);

module.exports = {
    PostModel
}