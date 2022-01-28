const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const CourseRegistrationSchema = new Schema({
    
    name                    : String,
    phoneno                 : String,
    email                   : String,
    // employeeStatus          : String,
    courseTitle             : String,
    // graduation              : String,
    // comments                : String,
    courseAmount            : String,
    creation_date           : Date
});

var CourseRegistrationdata = mongoose.model('courseRegister',CourseRegistrationSchema);

module.exports = CourseRegistrationdata;