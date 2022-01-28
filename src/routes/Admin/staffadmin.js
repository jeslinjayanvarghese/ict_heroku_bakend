const express = require('express');
let app = express.Router();

const StaffData = require('../../modals/staffData');

const fs = require('fs')


/* multer start */
const multer = require('multer');


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
   { name: 'file1', maxCount: 1 }
]);
/* multer end */


  //single staff
  app.get('/staffdata/:id', async (req, res) => {
    try{
    const id = req.params.id;
   await StaffData.findOne({ "_id": id })
        .then((staff) => {
            res.send(staff);
        });
    } catch (err) {
        console.log("error response in Singlestaff"+err)
    }
})



app.put('/updateIndex', (req, res) => {


    id = req.body._id;
    title = req.body.name;
    index = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    StaffData.findByIdAndUpdate({ "_id": id },
        { $set: { "index": index } })
        .then(function () {
            res.send(true);
        })

});

app.post('/insert',cpUpload, function (req, res) {
     
    console.log("new Staff",req.body)
    var staff = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image: req.files?.file1[0].path,
        role: req.body.role

    }
    var staffItem = new StaffData(staff);
    staffItem.save().then(function (data) {
        res.send(data)
    }).catch(function (error) {
        res.send(false)
    });

});

//deleting staff data
app.post('/remove', (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside remove ${id}`);
    StaffData.findByIdAndDelete({ '_id': id })
        .then(function (staff) {
            console.log('success')
            res.send(staff);
        });

});


///updating staff 
app.post('/update',cpUpload,(req, res) => {

    var item = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image: req.files?.file1[0].path,
        role: req.body.role
    }

    

    let id = req.body._id;
    let updateT = { $set: item };


    StaffData.findByIdAndUpdate({ _id: id }, updateT)
        .then((respond) => {
            if (respond) {
                console.log('mongoDb updated successfully for Course')
                res.send(true)
            }
            else {
                console.log('mongoDb update error', error)
                res.send(false)
            }
        });

});

module.exports = app;


