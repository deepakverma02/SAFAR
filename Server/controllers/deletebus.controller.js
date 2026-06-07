import { add_bus } from "../models/addbus.models.js";

export const delete_bus = async (req, res) => {
  const busnumber = req.body.Bus_number;

  try {
    const deletebus = await add_bus.deleteOne({ Bus_number: busnumber });

    if (deletebus.deletedCount === 1) {
      res.status(200).send({ "Message": "Bus Deleted Successfully!", deletebus });
    } else {
      res.status(404).send({ "Message": "Bus Number Not Found!" });
    }
  } catch (error) {
    console.error("An error occurred while deleting the bus:", error);
    res.status(500).send({ "Message": "An error occurred while deleting the bus!", error: error.message });
  }
};

export const bus_info=async(req,res)=>{
  const busnumber = req.body.Bus_number;
try{
  const bus= await add_bus.findOne({ Bus_number: busnumber})
if(bus){
  res.status(200).send(bus)
}
else{
  res.status(400).send({"Message":"Bus not found !"})
}
}
catch (error) {

  res.status(500).send({ "Message": "An error occurred while fetching the data !", error: error.message });
}
}