const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const eventsSchema = new Schema({

    regstatus: { type: Number, default: 1 },
    eventname: String,
    eventtype: String,
    eventabout: String,
    eventobjective:String,
    eventoverview: String,
    eventagenda: String,
    eventtraining: String,
    eventfees: String,
    lastDateReg: String,
    startdate: String,       
    enddate: String,
    image:String,
    eventRegFee: String,

  creation_date:Date
});

var eventsData = mongoose.model('events', eventsSchema);

module.exports = eventsData;