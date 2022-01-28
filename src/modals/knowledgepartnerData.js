const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const knowledgepartnerSchema = new Schema({
  image: String
});

var knowledgepartnerData = mongoose.model('knowledgepartner', knowledgepartnerSchema);

module.exports = knowledgepartnerData;