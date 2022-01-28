const express = require('express');
const eventsData = require('../../modals/eventsData');
let eventsRouter = express.Router();


//get events
eventsRouter.get('/', async function (req, res) {
    
   
         eventsData.find()
        .then(function (events) {
           
            res.send(events);
        })
  
});


//single event
// eventsRouter.get('single/:id', async function (req, res) {
    
   
//     eventsData.findById(req.params.id)
//    .then(function (events) {
    
//        res.send(events);
//    })

// });


eventsRouter.get('/single/:id', async (req, res) => {
    try{
    console.log("try");
    const id = req.params.id;
    console.log(req.body);
   await eventsData.findOne({ "_id": id })
        .then((event) => {
            res.send(event);
        });
    } catch (err) {
        console.log("error response in event "+ err)
    }
})
module.exports = eventsRouter;