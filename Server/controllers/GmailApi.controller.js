import { gmail_api } from "../gmailTesting.js";

//For Otp and ticket

export const GmailApi_controller = async (req, res) => {
  const { text, gmail: to, Subject: subject } = req.body;

  try {
    const response = await gmail_api(to, subject, text);

      res.status(200).send({ "Message": "Mail sent successfully" });
   
    console.log(response);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ "Message": "Something went wrong!" });
  }
};



