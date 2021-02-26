import express from 'express';
import mongoose from 'mongoose';
import Auth from '../models/auth.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
  
    try {
      const oldUser = await Auth.findOne({ email });
    console.log('oldUser' + oldUser);
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await Auth.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
      console.log(token);
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

export const signinUser = async(req, res) => {
    const { email, password } = req.body;
    try {
    const isemail = await Auth.findOne({email});
    if(!isemail) return res.status(404).json({message:"Không tồn tại email"});
    const ispassword = await bcrypt.compare(password, isemail.password);
    if (!ispassword) return res.status(400).json({message:"Nhập mật khẩu sai"});
    const token = jwt.sign({email: isemail.email, id: isemail._id},'test',{ expiresIn: '1h'});
    res.status(200).json({result: isemail, token});

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}