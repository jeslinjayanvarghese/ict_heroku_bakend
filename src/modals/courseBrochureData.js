const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const CourseBrochureSchema = new Schema({
    name                    : String,
    phoneno                 : String,
    email                   : String,
    creation_date           : Date
});

var CourseBrochuredata = mongoose.model('courseBrochure',CourseBrochureSchema);

module.exports = CourseBrochuredata;