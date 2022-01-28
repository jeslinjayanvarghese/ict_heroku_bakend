const express = require('express');
const academicData = require('../../modals/academicData');
let academicRouter = express.Router();

academicRouter.get('/', async function (req, res) {
    
    try { 
        await academicData.find()
        .then(function (academic) {
            res.send(academic);
        })
    }
    catch{
console.log("error fetching patrons")
    }
});

module.exports = academicRouter;