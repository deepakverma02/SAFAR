import { GmailApi_controller } from "../controllers/GmailApi.controller.js";

export const GmailApi_Route=(app)=>{
app.post('/sendGmail',GmailApi_controller)
}