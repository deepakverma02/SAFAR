import mongoose from "mongoose";

const PassangerData=new mongoose.Schema({

    
    Fullname:{
        type:String,
        require:true
    },
    Age:{
        type:String,
        require:true
    },
    Gender:{
        type:String,
        require:true
    },
    MobileNumber:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    SeatNo:{
        type:String,
        require:true   
    },
    TicketPrice:{
        type:String,
        require:true 
    }
})

const myTicket=new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    BusNumber:{
        type:String,
        require:true
    },
    BusName:{
        type:String,
        require:true  
    },
    totalPrice:{
        type:String,
        require:true
    },
    Bus_Type:{
        type:String,
        require:true
    },
    Bus_class:{
        type:String,
        require:true
    },
   SourceTiming:{
        type:String,
        require:true
    },
    DestinationTiming:{
        type:String,
        require:true
    },
    FoodFacility:{
        type:String,
        require:true
    },
    Source:{
        type:String,
        require:true
    },
    Destination:{
        type:String,
        require:true
    },
    Date:{
        type:String,
        require:true
    },
    PassangerDetails:[PassangerData],
    
    PnrNumber:{
        type:String,
        require:true
    },
    PaymentType:{
    type:String,
    require:true
    }
},{timestamps:true,versionKey:false})

export const Book_ticket=mongoose.model("Ticket",myTicket)
