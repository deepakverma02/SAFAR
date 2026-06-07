export const login_middleware=(req,res,next)=>{
   if (req.body.email) {
      req.body.email = req.body.email.toUpperCase();
    }
if (!req.body.email) {
   return res.status(400).send({'message':'Plese enter the email !'})
}
if (!req.body.password) {
   return res.status(400).send({'message':'Plese enter the password !'})
}
next()
}