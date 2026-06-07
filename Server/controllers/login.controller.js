import { server } from "../config/server.config.js";

import { reg_model } from "../models/reg.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        // Find the user by email
        
        const user = await reg_model.findOne({ email});

        if (!user) {
            return res.status(400).json({ error: 'This is not a valid user !' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        
        const token=jwt.sign({email:email},server.Secret_code,{expiresIn:200000000})
        res.status(200).send(
        {'Message':'Login successful',
            'name':user.name,
            'AccessToken':token,
            'userType': user.userType,
            'userId' : user._id,
            'email':user.email

        })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
        console.log(error)
    }
   
}