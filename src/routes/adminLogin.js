const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const adminData = require('../modals/adminSignup');
const bcrypt = require('bcrypt');


app.post('/', async function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)

    // mongo check for user
 let user= await adminData.findOne({'email': email})
 console.log(user);
//     if (admin) {
//     adminData.findOne({superadmin:superadmin=true})
// }
 bcrypt.compare(password,user.password)
 .then((status)=>{
     if(status){
        let payload = {subject: user.email,add:user.add,delete:user.delete,edit:user.edit,superadmin:user.superadmin}
        console.log("payload="+payload.subject)
        let token = jwt.sign(payload, 'secretKey')
        console.log("token="+token);
        res.send({token,add:user.add,delete:user.delete,edit:user.edit,superadmin:user.superadmin})       
     }
     else{
         res.send(false);
     }  
    }) 
});



module.exports = app;