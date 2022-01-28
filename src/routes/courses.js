const express = require('express');
const app = express.Router();
const nodemailer = require('nodemailer')
const multer = require('multer')
var fs = require('fs');

const CourseData =  require('../modals/courseData')
const CourseBrochure = require('../modals/courseBrochureData')

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
      );
    }
  });
  
  const upload = multer({ storage: storage });
  const cpUpload = upload.fields([
     { name: 'image', maxCount: 1 }
  ]);



//course card data route

app.get('/',async function (req, res) {
    try{
  await CourseData.find().sort({ index: 1 })
        .then(function (courses) {
            res.send(courses);
        });
    }
    catch(err) {
        console.log("error response in coursedata"+err)
    }
});




//Single course route

app.get('/courseSingle/:id', async (req, res) => {
    try{
    console.log("try");
    const id = req.params.id;
    console.log(req.body);
   await CourseData.findOne({ "_id": id })
        .then((course) => {
            res.send(course);
        });
    } catch (err) {
        console.log("error response in Singlecourse "+ err)
    }
})



//ADMIN ROUTES


//Add Course Route ||to admin
app.post('/Course/add', cpUpload ,async function (req, res) {
    console.log("not missed",req.body)

        var course = {
            courseTitle: req.body.courseTitle,
            courseType: req.body.courseType,
            courseShortName:req.body.courseShortName,
            courseImage: req.files?.image[0].path,
            courseAbout: req.body.courseAbout,
            courseCategory:req.body.courseCategory,
            // shortDesc:  req.body.shortDesc,
            category:  req.body.category,
            Reg_Status: req.body.Reg_Status,
            // Objectives: req.body.Objectives,
            EntranceExamDate: req.body.EntranceExamDate,
            commencementDate:req.body.commencementDate,
            orientationDate: req.body.orientationDate,
            lastDateReg: req.body.lastDateReg,
          
            courseRegFee: req.body.courseRegFee,
            courseDuration: req.body.courseDuration,
            samplequestion: req.body.samplequestion,
            placementlist: req.body.placementlist,
            internshipcertificate: req.body.internshipcertificate,
            shortDesc: req.body.shortDesc,
            LongDes: req.body.LongDes,
      
            courseFee: req.body.courseFee,
            courseAgenda: req.body.courseAgenda,
            active: req.body.active
        }

        var courseItem = new CourseData(course);
        courseItem.save().then(function (data) {
            res.send(data)
        }).catch(function (error) {
            res.send(false)

        });

    });



//Delete course route||to admin
app.post('/Course/remove', async(req, res) => {
    console.log(req.body);
    id = req.body._id
console.log(` inside deleted ${id}`);
CourseData.findByIdAndDelete({ '_id': id },
(err, result) => {
    if (err) {
        res.send(false)
    } else {
        res.send(true)
    }
});
});




//Update course route ||to admin
app.post('/Course/update',cpUpload, (req, res) => {

    id = req.body._id;
    let item = {
        courseTitle: req.body.courseTitle,
        courseType: req.body.courseType,
        courseShortName:req.body.courseShortName,
        courseImage: req.files?.image[0].path,
        courseAbout:req.body.courseAbout,
        // shortDesc:  req.body.shortDesc,
        category:  req.body.category,
        Reg_Status: req.body.Reg_Status,
        // Objectives: req.body.Objectives,
        EntranceExamDate: req.body.EntranceExamDate,
        commencementDate:req.body.commencementDate,
        orientationDate: req.body.orientationDate,
        lastDateReg: req.body.lastDateReg,
   
        courseRegFee: req.body.courseRegFee,
        courseDuration: req.body.courseDuration,
        samplequestion: req.body.samplequestion,
        placementlist: req.body.placementlist,
        internshipcertificate: req.body.internshipcertificate,
        shortDesc: req.body.shortDesc,
        LongDes: req.body.LongDes,
        dates: req.body.dates,
        courseFee: req.body.courseFee,
        courseAgenda: req.body.courseAgenda,
        // course_delivery: req.files?.file2[0].path,
        // internship_partner: req.files?.file3[0].path,
        // knowledge_partner: req.files?.file4[0].path,
        // index: indx,
        active: req.body.active
    
    }

    let updateCourse = { $set: item };
    CourseData.findByIdAndUpdate({ "_id": id }, updateCourse)
        .then((respond) => {
            if (respond) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        });
});


//CourseBrochure route & mail sending nodemailer section

app.post('/courseBrochure/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await CourseBrochure.find({ "course_id": id })
            .then((brochurePerson) => {
                // res.send(brochures);
                
           // initialize nodemailer
         var transporter = nodemailer.createTransport(
           {
             service: 'gmail',
             auth:{
             user: 'rightuser008@gmail.com',
             pass: 'SecretPassword@#$'
           }
         }
                );
                
                //mail sending To,from & Content creation section
                var mailOptions = {
                    from: '"ICT Academy of Kerala" <rightuser008@gmail.com>', // sender address
                    to: brochurePerson.email, // list of receivers
                    subject: 'Welcome!',
                    html: `<h1>test mail</h1>`, // Create HTML data directly
                   
                };
                
                // trigger the sending of the E-mail
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });

            });
    } catch (err) {
        console.log("error detected on Course Brochure"+err)
    }
})







module.exports = app;