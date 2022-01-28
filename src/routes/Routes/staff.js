const express = require('express');
const StaffData = require('../../modals/staffData');
let app = express.Router();

//to get all staffs for admin
app.get('/', async function (req, res) {
    await StaffData.find()
        .then(function (staff) {
        
            res.send(staff);
        })
});

// team
app.get('/team', async function (req, res) {
    await StaffData.find({"role":false})
        .then(function (staff) {
        
            res.send(staff);
        })
});

// leaders
app.get('/leaders', async function (req, res) {
    await StaffData.find({"role":true})
        .then(function (staff) {
            res.send(staff);
        })
});

module.exports = app;