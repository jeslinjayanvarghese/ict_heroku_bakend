const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const PartnershipApplicationSchema = new Schema({    
        name: String,
        email: String,
        phone: String,
        firm: String,
        address: String,
        district: String,
        officeSpace: String,
        report: String,
        expect: String,
        profile: String,
        employeeCount: String,
        creation_date: Date
      });
      

var NewPartnerApplicationData = mongoose.model('partnershipApplication', PartnershipApplicationSchema);

module.exports = NewPartnerApplicationData    ;