const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const admindataSchema = new Schema({
   
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    add: Boolean,
    delete: Boolean,
    edit: Boolean,
    superadmin: Boolean,
});

//  fire a function before doc saved to db
admindataSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

var SignUpData = mongoose.model('admindata', admindataSchema);

module.exports = SignUpData;