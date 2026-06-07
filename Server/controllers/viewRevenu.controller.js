import { Book_ticket } from "../models/myticket.model.js";

export const viewrevenu_controller = async (req, res) => {
  const start_date = new Date(req.body.startdate); // Convert to Date object
  const end_date = new Date(req.body.enddate); // Convert to Date object
  const busNumber = req.body.busNumber;

  try {


    // Query the database for tickets within the date range and matching bus number
    const response = await Book_ticket.find({
      createdAt: {
        $gte: start_date, // Greater than or equal to start date
        $lte: end_date    // Less than or equal to end date
      },
      BusNumber: busNumber
    });

    // Send the response
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(404).send({ Message: "No data found" });
    }
  } catch (err) {
    res.status(500).send({ Message: "Something went wrong!", error: err.message });
  }
};
