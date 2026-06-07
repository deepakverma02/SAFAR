import { ModifyBus } from "../controllers/modify.controller.js"
import { is_admin } from "../middleware/Is_admin.middleware.js";
import {verify_middleware} from "../middleware/verify_singnup.middleware.js"
import { modify_bus } from "../middleware/modify_bus.middleware.js";


export const modify_route=(app)=>{
    app.post('/modifybus',[verify_middleware,is_admin,modify_bus],ModifyBus)
    }