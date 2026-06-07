import { add_bus_controller } from "../controllers/addbus.controller.js";
import { verify_middleware } from "../middleware/verify_singnup.middleware.js";
import { is_admin } from "../middleware/Is_admin.middleware.js";
import { unique_bus } from "../middleware/uniquebus.middleware.js";
export const addbus_route=(app)=>{
    app.post('/addbus',[verify_middleware,is_admin,unique_bus],add_bus_controller)
    }