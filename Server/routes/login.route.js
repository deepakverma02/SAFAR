import { login } from "../controllers/login.controller.js"
import { login_middleware } from "../middleware/login.middleware.js"
export const login_route= (app)=>{
    app.post('/login',[login_middleware],login)}