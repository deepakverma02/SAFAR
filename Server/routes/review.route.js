import { review_controller } from "../controllers/review.controller.js"
import { display_review } from "../controllers/review.controller.js"
export const review_route=(app)=>{
app.post('/review',review_controller)
app.get('/displayReview',display_review)
}