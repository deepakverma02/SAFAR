import { viewrevenu_controller } from "../controllers/viewRevenu.controller.js";

export const viewRevenu_router=(app)=>{

    app.post('/viewRevenu',viewrevenu_controller)



}