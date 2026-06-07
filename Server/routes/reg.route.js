import { register } from "../controllers/reg.controller.js";
import { verify_reg } from "../middleware/reg.middleware.js";
import { unique_gmail } from "../middleware/reg.middleware.js";
export const reg_route= (app)=>{
    app.post('/register',[verify_reg,unique_gmail],register)}