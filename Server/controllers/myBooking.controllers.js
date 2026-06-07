import { Book_ticket } from "../models/myticket.model.js"
export const my_Booking=async(req,res) => {
const user=req.body.userid;


try{
    const response=await Book_ticket.find({"userid":user});
   

    if(response){
        res.status(200).send(response)
    }
    else{
        res.status(401).send({"Message":"No Data Found !"})
    }
}


catch(err){
   res.status(400).send({"Message":"Something went wrong !"})

}

}


//For delete the booking 

export const delete_booking= async(req,res)=>{
const booking_id=req.body.bookingid
const passanger_id= req.body._id;

try {
    const response = await Book_ticket.findOneAndUpdate(
        { _id: booking_id},
        { $pull: { PassangerDetails: { _id:passanger_id } } },
        { new: true }  // Return the updated document
    );

    const newTotalPrice = response.PassangerDetails.reduce((total, passenger) => {
        return total + parseFloat(passenger.TicketPrice);
    }, 0);

    // Update the booking with the new total price
    const updatedBooking = await Book_ticket.findByIdAndUpdate(
        booking_id,
        { totalPrice: newTotalPrice },
        { new: true } // Return the updated document
    );

    if (updatedBooking) {
        res.status(200).send({ message: 'Passenger deleted and total price updated successfully' });
    } else {
        res.status(500).send({ message: 'Failed to update total price' });
    }
} catch (error) {
    console.error('Error deleting passenger:', error);
    res.status(500).send({ message: 'Failed to delete passenger' });
}
};


// Delete all booking 

export const deleteAllBooking=async(req,res)=>{

    const userid=req.body.userid;
    try{
        const response = await Book_ticket.deleteOne({_id:userid})
        if(response){
            res.status(200).send({"Message":"All ticket get canceled",response})
        }
        else{
            res.status(400).send({"Message":"No Ticket Found "})
        }

    }
    catch(err){
        res.status(401).send({"Message":"Somethig went wrong !"})
    }

}

