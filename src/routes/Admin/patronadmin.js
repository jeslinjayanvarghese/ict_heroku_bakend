const express = require('express');
const patronadminRouter = express.Router();
const patronData = require('../../modals/patronData');
const fs = require('fs');

/* multer start */
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
    );
  }
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
   { name: 'image', maxCount: 1 }
]);
/* multer end */




/* check cpUpload */
patronadminRouter.post('/add', cpUpload, async (req, res) => {
  try{
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await patronData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});



 //Delete patron route||to admin
 patronadminRouter.post('/remove', async(req, res) => {
  console.log(req.body);
id = req.body._id
console.log(` inside deleted ${id}`);
await patronData.findByIdAndDelete({ '_id': id },
(err, result) => {
  if (err) {
      res.send(false)
  } else {
      res.send(true)
  }
});
});

module.exports = patronadminRouter;
