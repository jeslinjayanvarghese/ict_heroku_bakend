const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({

  courseTitle: String, 
  courseType: String, 
  courseImage: String,
  courseAbout: String,  
  courseAgenda: String,
  courseFee: String,
  EntranceExamDate: String,
  lastDateReg: String,
  commencementDate: String,  
  orientationDate: String,
  Objectives: String,
  courseRegFee: String, //250
  courseShortName: String, 
  courseDuration: String,  
  courseCategory: String,
  samplequestion: String,  
  placementlist: String,  //same
  samplecertificate: String,  //same
  internshipcertificate: String,  //same
  shortDesc: String, 
  LongDes: String, //ethu vechere kalayanda..v might use it somewhere //kaly
  Reg_Status: String, 
  course_delivery: String,  // static
  internship_partner: String,  // static
  knowledge_partner: String, // static
  index: Number,  
  active: Boolean,  
});

var Coursedata = mongoose.model("coursedata", CourseSchema);

module.exports = Coursedata;
