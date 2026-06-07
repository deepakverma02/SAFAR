export const verifyMobile_middleware=(req,res,next)=>{
   if (req.body.email) {
      req.body.email = req.body.email.toUpperCase();
    }


    if (!req.body.mobNum) {
       return res.status(400).send({'message':'Plese enter the Mobile Number !'})
    }

    if (!req.body.email) {
        return res.status(400).send({'message':'Plese enter the Gmail  !'})
     }
    next()
    }