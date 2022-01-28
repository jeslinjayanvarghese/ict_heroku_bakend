const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const academicSchema = new Schema({
  
  slno:Number,
  membid:String,
  name:String,
  website:String,
  creation_date:Date
});

var academicData = mongoose.model('academic', academicSchema);

module.exports = academicData;