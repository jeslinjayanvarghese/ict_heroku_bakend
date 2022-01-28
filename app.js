const express=require('express');
const app =  express();

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
// const path = require('path');

// app.use(express.static('./dist/FrontEnd'));

const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true })); //middleware portion for adding data
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.json());

// Route for testimonial in home page starts here
const hometestimonialRouter = require('./src/routes/Routes/hometestimonial');
app.use('/hometestimonials',hometestimonialRouter)
// Route for testimonial for home page ends here


// Route for testimonial in home page starts here
const staffRouter = require('./src/routes/Routes/staff');
app.use('/staff',staffRouter)
// Route for testimonial for home page ends here

// Route for patrons starts here
const patronRouter = require('./src/routes/Routes/patron');
app.use('/patrons',patronRouter)
// Route for patrons ends here

// Route for knowledge partner starts here
const knowledgepartnerRouter = require('./src/routes/Routes/knowledgepartner');
app.use('/knowledge',knowledgepartnerRouter)
// Route for knowledge partner starts here

// Route for Industrial partners starts here
const industrypartnerRouter = require('./src/routes/Routes/industryPartner');
app.use('/industry',industrypartnerRouter)
// Route for Industrial partners ends here

// Partner application form route starts here
const partnerformRouter = require('./src/routes/Routes/partnerForm');
app.use('/PartnershipApplication', partnerformRouter);
// Partner application form starts route here

// corporate application form routestarts here
const corporateformRouter = require('./src/routes/Routes/corporateform');
app.use('/CorporateApplication', corporateformRouter);
// corporate application form route ends here

// academic page route starts here
const academicRouter = require('./src/routes/Routes/academicMembership');
app.use('/academic', academicRouter);
// academic page route  ends here

// Route for events starts here
const eventsRouter = require('./src/routes/Routes/events');
app.use('/events',eventsRouter)
// Route for events ends here

//Event Registration
const registrationevent = require('./src/routes/eventRegistration'); //event registration page
app.use('/registrationevent',registrationevent);




//Course Card data route
const Course = require('./src/routes/courses')
app.use('/course',Course)

//Course Registration
const registration = require('./src/routes/courseRegistration'); //course registration page
app.use('/registration',registration);

//Course testinomy route
const testimony = require('./src/routes/courseTestimony');
app.use('/CourseTestimony',testimony)

//Contact Registration
const contact = require('./src/routes/contactRegistration'); //contact reg
app.use('/contact',contact);






// ADMIN STARTS HERE


//Jwt token common
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
      return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
      return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}
  
//Admin Login Route
const Login = require('./src/routes/adminLogin')
app.use('/login',Login)

 //Admin logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
}); 

//Admin Signup Route
const Admin = require('./src/routes/adminSignup')
app.use('/signup',Admin)




// patrons admin adding patrons starts here 
const patronadminRouter = require('./src/routes/Admin/patronadmin');
app.use('/patronadmin', patronadminRouter);
// patrons admin adding patrons ends here 

// patrons admin adding patrons starts here 
const industrypartneradminRouter = require('./src/routes/Admin/industrialpartneradmin');
app.use('/industrypartneradmin', industrypartneradminRouter);
// patrons admin adding patrons ends here 

// patrons admin adding patrons starts here 
const knowledgepadmin = require('./src/routes/Admin/knowledgepartneradmin');
app.use('/knowledgeadmin', knowledgepadmin);
// patrons admin adding patrons ends here 

// patrons admin adding patrons starts here 
const staffadminRouter = require('./src/routes/Admin/staffadmin');
app.use('/staffadmin', staffadminRouter);
// patrons admin adding patrons ends here 

// academic admin adding colleges starts here
const academicadminRouter = require('./src/routes/Admin/academicadmin');
app.use('/academicadmin', academicadminRouter);
// academic admin adding colleges ends here


// events admin adding events starts here
const eventsadminRouter = require('./src/routes/Admin/eventsadmin');
app.use('/eventsadmin', eventsadminRouter);
// events admin adding events ends here

//Admin todos Route
const Todos = require('./src/routes/Admin/todoAdmin')
app.use('/todo',Todos)


// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist//FrontEnd/index.html'))
//  });


// port listening to starts here//
app.listen(port, () => {
    console.log("Server ready at" + port);
});
// port listening to ends here//