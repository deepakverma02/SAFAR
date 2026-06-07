import mongoose from "mongoose";

const review_schema=new mongoose.Schema({
 name:{
    type:String,
    require:true
},
review:{
    type:String,
    require:true
}

},{timestamps:true,versionKey:false})

export const review_model=mongoose.model("review",review_schema)