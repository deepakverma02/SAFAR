import { contact } from "../controllers/contact.controller.js";
import { verify_middleware } from "../middleware/verify_singnup.middleware.js";
import { Contact_us } from "../middleware/contactus.middlewre.js";
export const contact_data=(app)=>{
app.post('/contact',[verify_middleware,Contact_us],contact)
}