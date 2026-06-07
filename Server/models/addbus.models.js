import mongoose from "mongoose";

const addbus=mongoose.Schema({

    Bus_number:{
        type:String,
        require:true,
        unique: true
    },
    Bus_name:{
        type:String,
        require:true
    },
    Number_seat:{
        type:String,
        require:true
    },
    Seat_price:{
        type:String,
        require:true
    },
    Source:{
        type:String,
        require:true
    },
    Source_time:{
        type:String,
        require:true
    },
    Destination:{
        type:String,
        require:true
    },
    Destination_time:{
        type:String,
        require:true
    },
    Bus_type:{
        type:String,
        require:true
    
    },
    Bus_Class:{
        type:String,
        require:true
    
    },
    Timing:{
        type:String,
        require:true
    
    },
    Food_Facility:{
        type:String,
        require:true
    
    },






},{timestamps:true,versionKey:false})
export const add_bus=mongoose.model("Bus",addbus)