const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoute = require("./routes/userSignupRoute");
const blogRoute = require("./routes/blogRoute");
require('dotenv').config();
const app = express();
const cloudinary = require('cloudinary').v2;


// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use(userRoute)
app.use(blogRoute)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    })
  })
  .catch((err)=>{
    console.log('Error while connecting to mongo:', err)
  })
