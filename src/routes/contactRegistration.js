const express = require("express");
const app = express.Router();
const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");

const CLIENT_ID =
  "358879111934-lldho3noupbpkclh30g3iv06t8ri0m64.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04YjoTW1pK31aCgYIARAAGAQSNwF-L9IrCq-LYDWmQMbF3mWMAiYDsnMNw_NsclAfcLxX6i8ziIE9Z2m7AbdZxxdGYkrLItyZx2s";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


async function sendEmail(data) {
 
  try {
  
    const accessToken = await oAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        type: "OAuth2",
        user: "creationzv@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

  
    const mailOptions = {
      
      from: `${data.name} <creationzv@gmail.com>`,
      to: 'jeslinjaisan@gmail.com',
      subject: `${data.coursename}`,
      text: `${data.subject} Please Contact me back at ${data.email}`,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

//Course Registration form data recieving route

app.post("/contactRegister", function (req, res) {
    
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  console.log(req.body);

  let contactItem = {
    name: req.body.name,
    email: req.body.email,
    coursename: req.body.coursename,
    subject: req.body.subject,
  }
  sendEmail(contactItem).then((data)=>{
    res.send(data);
  })

});

module.exports = app;
