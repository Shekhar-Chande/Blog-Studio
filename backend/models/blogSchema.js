const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    email: { type: String, required: true },
    authorName: { type: String, required: true },   
    blogTitle: { type: String, required: true },
    blogDescription: { type: String, required: true }, 
    image: { type: String, required: true },
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
})

module.exports = mongoose.model('publishedBlogs', blogSchema);