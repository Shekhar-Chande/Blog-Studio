    const express = require('express');
    // const upload = require('../middlewares/imageUploader');
    blogController = require('../controllers/blogController');
    const blogroute = express.Router();
    const upload = require('../middlewares/imageUploader');



    blogroute.post('/api/blogs', upload.single('image'), blogController.publishBlog);
    blogroute.get('/api/blogs', blogController.getAllBlogs);
    blogroute.get('/api/blogs/:id', blogController.getOneBlog);
    blogroute.get('/api/userblogs', blogController.getUserBlogs);


    module.exports = blogroute;