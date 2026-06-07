import { BusData } from "../controllers/BusData.controller.js"
import { verify_middleware } from "../middleware/verify_singnup.middleware.js";
export const bus_data=(app)=>{
    app.post('/busdata',[verify_middleware],BusData)
    }