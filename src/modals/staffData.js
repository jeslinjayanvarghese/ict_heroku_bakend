const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
     name:String,
     designation: String,
     image: String,
     about: String,
     email :String,
     role:Boolean

});

var StaffsData = mongoose.model('staffdata', StaffSchema);

module.exports = StaffsData;