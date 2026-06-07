import { verify_middleware } from "../middleware/verify_singnup.middleware.js";
import { is_admin } from "../middleware/Is_admin.middleware.js";
import { delete_bus } from "../controllers/deletebus.controller.js";
import { bus_info } from "../controllers/deletebus.controller.js";
export const delete_route=(app)=>{

    app.post('/deletebus',[verify_middleware,is_admin],delete_bus)
    app.post('/businfo',[verify_middleware,is_admin],bus_info)
    }