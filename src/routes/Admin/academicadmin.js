const express = require('express');
const academicData = require('../../modals/academicData');

let academicadminRouter = express.Router();

academicadminRouter.post('/', async function (req, res) {
console.log(req.body)
try{
    let item = {

        slno: req.body.slno,
        membid: req.body.membid,
        name: req.body.name,
        website: req.body.website,       
        creation_date: new Date(),
    }
    let newacademic = await academicData(item);
   
   await newacademic.save()
        res.send(true)
    }
    catch {
        res.send(false)
    }

});



   //Delete academic route||to admin
   academicadminRouter.post('/remove', async(req, res) => {
    console.log(req.body);
  id = req.body._id
  console.log(` inside deleted ${id}`);
  await academicData.findByIdAndDelete({ '_id': id },
  (err, result) => {
    if (err) {
        res.send(false)
    } else {
        res.send(true)
    }
  });
  });


module.exports = academicadminRouter;