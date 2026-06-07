import { verifyMobile } from "../controllers/verifyMobile.controller.js"
import { newPassword } from "../controllers/verifyMobile.controller.js"
import { verifyMobile_middleware } from "../middleware/verifyMobile.middleware.js"
export const verify_Mobile= (app)=>{
    app.post('/verifyMobile',[verifyMobile_middleware],verifyMobile)
    app.post('/resetPassword',[verifyMobile_middleware],newPassword)}