const express = require('express');
const eventsData = require('../../modals/eventsData');
const fs = require('fs');
const multer = require("multer");

let eventsadminRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${+Date.now()}.${file.originalname.split(".")[1]}`
    );
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: "image", maxCount: 1 }]);
/* multer end */

//Update event route ||to admin
eventsadminRouter.post("/event/update", cpUpload, (req, res) => {
  id = req.body._id;
  let item = {
    coursename: req.body.coursename,
    eventname: req.body.eventname,
    eventtype: req.body.eventtype,
    eventabout: req.body.eventabout,
    eventobjective: req.body.eventobjective,
    eventoverview: req.body.eventoverview,
    eventagenda: req.body.eventagenda,
    eventtraining: req.body.eventtraining,
    eventfees: req.body.eventfees,
    lastDateReg: req.body.lastDateReg,

    regstatus: req.body.regstatus,
    fees: req.body.fees,
    agenda: req.body.agenda,
    objectives: req.body.objectives,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    image: req.files?.image[0].path,
    creation_date: new Date(),
  };

  let updateevent = { $set: item };
  eventsData.findByIdAndUpdate({ _id: id }, updateevent).then((data) => {
    if (data) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});


eventsadminRouter.post("/add", cpUpload, async function (req, res) {
  console.log(req.body);
  try {
    let item = {
      coursename: req.body.coursename,
      eventname: req.body.eventname,
      eventtype: req.body.eventtype,
      eventabout: req.body.eventabout,
      eventobjective: req.body.eventobjective,
      eventoverview: req.body.eventoverview,
      eventagenda: req.body.eventagenda,
      eventtraining: req.body.eventtraining,
      eventfees: req.body.eventfees,
      lastDateReg: req.body.lastDateReg,

      regstatus: req.body.regstatus,
      fees: req.body.fees,
      agenda: req.body.agenda,
      objectives: req.body.objectives,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      image: req.files?.image[0].path,
      creation_date: new Date(),
    };
    let newevents = await eventsData(item);

    await newevents.save();
    res.send(true);
  } catch {
    res.send(false);
  }
});


eventsadminRouter.post("/events/remove", async (req, res) => {
  console.log(req.body);
  id = req.body._id;
  console.log(` inside deleted ${id}`);
  eventsData.findByIdAndDelete({ _id: id }, (err, result) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

    module.exports = eventsadminRouter;