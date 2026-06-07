import { reg_model } from "../models/reg.model.js";

export const verify_reg = (req, res, next) => {
    try {

        if (req.body.email) {
            req.body.email = req.body.email.toUpperCase();
          }


        if (!req.body.name) {
            return res.status(400).send({
                message: 'Failed! Name was not provided in request body'
            });
        }

        if (!req.body.email) {
            return res.status(400).send({
                message: 'Failed! Email was not provided in request body'
            });
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: 'Failed! Password was not provided in request body'
            });
        }

        // If all checks pass, move to the next middleware or route handler
        next();
    } catch (err) {
        console.log("Error while validating the request body!", err);
        res.status(500).send({
            message: 'Error while validating the request body!'
        });
    }
};

//Unique gmail

export const unique_gmail=async(req,res,next)=>{
    const regGmail=req.body.email
try{
const gmail=await reg_model.findOne({email:regGmail})
if(gmail){
   return res.status(415).send({"Message":"Gmail already exist !"})
}
else{
    next()
}

}

catch(error){
    res.status(400).send({"Message":"Something went wrong !"})
}
}
