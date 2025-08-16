const express = require("express");
const registeredUsers = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY ="ChanderShekharBhardwaj"


exports.signupUser = async(req, res) =>{
    if(!req.body){
        console.log(" Cant send empty data")
    }

    try{

        //Existing user check
        const {id, name, email, password} = req.body;

        const existingUser = await registeredUsers.findOne({email: email})
        if(existingUser){
             return res.status(400).json({ message: "User already exist" });
        }

        //Hashed password
        const hashedPassword = await bcrypt.hash(password, 12)

         
        //User Creation
        const newUser = new registeredUsers({
            id,
            name,
            email,
            password: hashedPassword
        });
        const saveUser = await newUser.save();
        // res.status(201).json({newUser});
        console.log("Account created successfully")


        //Token Generate
        const token = jwt.sign({email: newUser.email, id:newUser._id}, SECRET_KEY)  
        res.status(200).json({user: newUser, token: token})

    }
    catch(err){
        res
      .status(400)
      .json({ message: "Failed to create Account", error: err.message });
    }
}



 exports.signinUser = async (req, res) =>{
    const {email, password} = req.body
    try{

        const existingUser = await registeredUsers.findOne({email: email})
        if(!existingUser){
             console.log("User not found");
             return res.status(400).json({ message: "User not found" });
            
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if(!matchPassword){
             console.log("Invalid Credential")
            return res.status(400).json({message: "Invalid Credential"});
            
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY)
        res.status(201).json({user: existingUser, token: token});


    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}