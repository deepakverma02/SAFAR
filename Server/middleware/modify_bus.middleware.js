export const modify_bus = async (req, res, next) => {
    try {
        if (!req.body.Bus_name) {
            return res.status(400).send({ "Message": "Please Enter the Bus Name!" });
        } else if (!req.body.Number_seat) {
            return res.status(400).send({ "Message": "Please Enter the Number of seats!" });
        } else if (!req.body.Seat_price) {
            return res.status(400).send({ "Message": "Please Enter the per seat price!" });
        } else if (!req.body.Source) {
            return res.status(400).send({ "Message": "Please Enter the Source!" });
        } else if (!req.body.Source_time) {
            return res.status(400).send({ "Message": "Please Enter the Source time!" });
        } else if (!req.body.Destination) {
            return res.status(400).send({ "Message": "Please Enter the Destination!" });
        } else if (!req.body.Destination_time) {
            return res.status(400).send({ "Message": "Please Enter the Destination time!" });
        } else if (!req.body.Bus_type) {
            return res.status(400).send({ "Message": "Please Enter the Bus type!" });
        }

        // If all checks pass, proceed to the next middleware
        next();
    } catch (error) {
        res.status(500).send({ "Message": "Something went wrong!", "Error": error.message || "Unknown error occurred" });
    }
};
