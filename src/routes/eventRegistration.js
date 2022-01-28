const express = require("express");
const app = express.Router();
const nodemailer = require('nodemailer');
const EventRegistrationdata = require('../modals/eventRegistration');
const {google}=require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2')


const CLIENT_ID='358879111934-lldho3noupbpkclh30g3iv06t8ri0m64.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04YjoTW1pK31aCgYIARAAGAQSNwF-L9IrCq-LYDWmQMbF3mWMAiYDsnMNw_NsclAfcLxX6i8ziIE9Z2m7AbdZxxdGYkrLItyZx2s'

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


//send email to recepient
async function sendEmail(data){

    try{
        const accessToken=await oAuth2Client.getAccessToken()
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'creationzv@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken:accessToken
            }
        });

          const mailOptions={
              from:'ICT Academy of Kerala <creationzv@gmail.com>',
              to: data.email,
              subject:'Event Registered Successfully',
              text:`You have been successfully enrolled to ${data.eventTitle}` 

          }

          const result =  await transporter.sendMail(mailOptions)
          return result

    }catch(error){
        return error
    }
}


//event registration
app.post("/eventRegister", function (req, res) {

    let RegistrationItem = {
      eventId: '',
      eventTitle: req.body.et,
      name: req.body.e.name,
      email: req.body.e.email,
      phoneno: req.body.e.phoneno,
      eventAmount: req.body.ef,
    };
    console.log(RegistrationItem);
    var register = new EventRegistrationdata(RegistrationItem);
    register.save().then((data)=>{
      res.send(data);
      sendEmail(data).then((res)=>{
        console.log(res);    
    })
    
    })

    // let coursereg = await RegisterCourse(RegistrationItem);
    // console.log(req.body.coursereg);
    // await coursereg.save()
    //     res.send(coursereg);

    // await RegisterCourse.findOne({
    //   email: RegistrationItem.email,
    //   courseId: RegistrationItem.courseId,
    // }).then(function (cousrseReg) {



      
    //   var bexist = false;
    //   console.log(
    //     `fetched from db Email ID - ${RegistrationItem.email}, coursetitle - ${RegistrationItem.courseTitle}`
    //   );
    //   for (var i = 0; i < cousrseReg.length; i++) {
    //     if (
    //       cousrseReg[i].email == RegistrationItem.email &&
    //       cousrseReg[i].courseId == RegistrationItem.courseId
    //     ) {
    //       bexist = true;
    //     }
    //   }
    //   if (bexist) {
    //     console.log(
    //       `Email ID is already registered for the course ${RegistrationItem.courseTitle}`
    //     );
    //     res
    //       .status(401)
    //       .send(
    //         `Email ID is already registered for the course ${RegistrationItem.courseTitle}`
    //       );
    //   } else {
    //     var Userdata = RegisterCourse(RegistrationItem);
    //     Userdata.save();
    //     console.log(
    //       `The registered user added is : Email ID - ${RegistrationItem.email}, Course - ${RegistrationItem.courseTitle}`
    //     );
    //     res.status(200).send({ RegistrationItem });
    //   }
    
    // });

    //  
            
        });
        module.exports = app;