import mongoose from "mongoose";

const registerSchema=new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    mobNum : {
        type: Number,
        require : true
    },
    password: {
        type:String,
        require:true
    },
    userType: {
        type: String,
        require: true,
        default:'PASSENGER',
        enum:["PASSENGER","ADMIN"]
    }
},{timestamps:true,versionKey:false})

export const reg_model=mongoose.model("register",registerSchema)
