import { add_bus } from "../models/addbus.models.js";

export const BusData = async (req, res) => {
    const { Source,Destination} = req.body;
  
    try {
      const data = await add_bus.find({Source,Destination})
        ;
  
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ "Message": "No Result Found !" });
      }
    } catch (err) {
      console.error("Error while fetching data:", err);
      res.status(500).send({
        "Message": "Error while fetching the data!",
        "Error": err.message || "Unknown error occurred",
        "Details": err.stack || "No stack available"
      });
    }
  };