const express = require("express");
const blogSchema = require("../models/blogSchema");
const cloudinary = require("cloudinary").v2;

exports.publishBlog = async (req, res) => {
  if (!req.file || !req.body) {
    console.log("Cannot send empty data");
    return res.status(400).json({ message: "No data provided" });
  }

  try {
    const { email, authorName, blogTitle, blogDescription } = req.body;
    // const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.file.buffer.toString('base64')}`);
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    );

    console.log("result:", result);
    const imageUrl = result.secure_url;

    // const imagePath = req.file.path;

    const newBlog = new blogSchema({
      email,
      authorName, // Store the path of the uploaded image
      blogTitle,
      blogDescription,
      image: imageUrl,
    });

    const savedBlog = await newBlog.save();
    console.log("Blog published successfully");

    res.status(201).json({
      message: "Blog published successfully",
      blog: savedBlog,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to publish blog", error: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const fetchedBlogs = await blogSchema.find();

    // console.log("Fetched blogs:", fetchedBlogs);
    res.status(200).json({
      message: "Success",
      data: {
        fetchedBlogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch blogs",
      error: err.message,
    });
  }
};

exports.getUserBlogs = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userBlogs = await blogSchema.find({ email: email });

    res.status(200).json({
      message: "User blogs fetched successfully",
      data: {
        userBlogs: userBlogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch user blogs",
      error: err.message,
    });
  }
};


exports.getOneBlog = async (req, res) => {
  
  try{
    const document = await blogSchema.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog fetched successfully",
      data: {
        fetchedBlog: document,
      },
    });
  }
  catch (err) {
    res.status(400).json({
      message: "Failed to fetch blog",
      error: err.message,
    });
  }
}
