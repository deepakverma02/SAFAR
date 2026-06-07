import mongoose from "mongoose";

const contact_schema =mongoose.Schema({
    Bus_number:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    contact_number:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:'Pending..',
        enum:["Pending..","Solution Provided"]
    },
   
},{timestamps:true,versionKey:false})

export const contact_us=mongoose.model("Support",contact_schema)