const express = require('express');
const patronData = require('../../modals/patronData');
let patronRouter = express.Router();

patronRouter.get('/', async function (req, res) {
    
    try { 
        await patronData.find()
        .then(function (patron) {
            res.send(patron);
        })
    }
    catch{
console.log("error fetching patrons")
    }
});

module.exports = patronRouter;