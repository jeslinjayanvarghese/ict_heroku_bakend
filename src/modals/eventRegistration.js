const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const EventRegistrationSchema = new Schema({
    eventId                : String,
    eventTitle              : String,
    name                    : String,
    phoneno                 : String,
    email                   : String,
    eventAmount            : String,
    creation_date           : Date
});

var EventRegistrationdata = mongoose.model('eventRegister',EventRegistrationSchema);

module.exports = EventRegistrationdata;