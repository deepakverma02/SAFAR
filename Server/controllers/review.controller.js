import { review_model } from "../models/review.models.js";

export const review_controller=async(req,res)=>{

const name=req.body.name;
const review=req.body.review;

try {
    const reviewData = review_model.create({name:name,review:review})
    res.status(201).send({"Message":"Review Submitted Successfully"})
}
catch (error) {
    console.log('Error occured ', error);

    res.status(501).send({
        message: 'Error occur while creating a new review  !'
    })
}

}

// For display the review

export const display_review=async(req,res)=>{

try{
    const response=await review_model.find()
    res.status(200).send(response)
}

catch (error) {
    console.log('Error occured ', error);

    res.status(501).send({
        message: 'Error occur while Fatching the review  !'
    })
}


}



