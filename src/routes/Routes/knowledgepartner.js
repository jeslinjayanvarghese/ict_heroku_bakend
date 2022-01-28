const express = require('express');
const knowledgepartnerData = require('../../modals/knowledgepartnerData');
let knowledgepartnerRouter = express.Router();

knowledgepartnerRouter.get('/', async function (req, res) {
    
    try { 
        await knowledgepartnerData.find()
        .then(function (knowledgepartner) {
            res.send(knowledgepartner);
        })
    }
    catch{
        console.log("error fetching knowledgepartners")
    }
});


module.exports = knowledgepartnerRouter;