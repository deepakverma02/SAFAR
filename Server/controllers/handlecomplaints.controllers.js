import {contact_us} from "../models/contact.module.js"; // Assuming a default export

export const heandlecomplain = async (req, res) => {
  const { Bus_number } = req.body;

  try {
    const data = await contact_us.find({Bus_number})
      ;

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ "Message": "Bus Number Not Found!" });
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


// for updating the bus complain  from panding to resolved 

export const heandleupdate = async (req, res) => {
  const { _id } = req.body;

  try {
    const filter = {_id: _id};

    const update = { $set: { status: 'Solution Provided' } };

    const data = await contact_us.updateOne(filter, update);
      

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ "Message": "Something went wrong !" });
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

//For deleting the complain 

export const heandledelete = async (req, res) => {
  const { _id } = req.body;

  try {

 
    const data = await contact_us.deleteOne({_id});

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ "Message": "Something Went Wrong !" });
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

