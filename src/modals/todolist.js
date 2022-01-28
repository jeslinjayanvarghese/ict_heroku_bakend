const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
   todos: String
});

var todoData = mongoose.model("Todolist", TodoSchema);

module.exports = todoData;
