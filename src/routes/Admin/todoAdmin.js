const express = require('express');
const app = express.Router();

const Todolistdata = require('../../modals/todolist')

//todosroute

app.get('/',async function (req, res) {
    try{
  await Todolistdata.find().sort({ index: 1 })
        .then(function (todo) {
            res.send(todo);
        });
    }
    catch(err) {
        console.log("error response in TODOSdata"+err)
    }
});


//ADMIN ROUTES


//Add todo Route ||to admin
app.post('/todo/add',async function (req, res) {
    console.log("not missed",req.body)
     var todo = {
         todos: req.body.todos,
        }

        var todoItem = new Todolistdata(todo);
        todoItem.save().then(function (data) {
            res.send(data)
        }).catch(function (error) {
            res.send(false)

        });

    });


//Delete todo route||to admin
app.post('/todo/remove', async(req, res) => {
    console.log(req.body);
    id = req.body._id
console.log(` inside deleted ${id}`);
Todolistdata.findOneAndDelete({ '_id': id },
(err, result) => {
    if (err) {
        res.send(false)
    } else {
        res.send(true)
    }
});
});




//Update todo route ||to admin
app.post('/todo/update', (req, res) => {

    id = req.body._id;
    let item = {
        todos: req.body.todos,
    }

    let updateTodo = { $set: item };
    Todolistdata.findByIdAndUpdate({ "_id": id }, updateTodo)
        .then((respond) => {
            if (respond) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        });
});



module.exports = app;