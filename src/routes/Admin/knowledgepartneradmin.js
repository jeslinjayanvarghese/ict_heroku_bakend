const express = require('express');
const knowledgepartneradminRouter = express.Router();
const knowledgepartnerData = require('../../modals/knowledgepartnerData');
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
knowledgepartneradminRouter.post('/', cpUpload, async (req, res) => {
  try{
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await knowledgepartnerData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});


 //Delete knowledge route||to admin
 knowledgepartneradminRouter.post('/remove', async(req, res) => {
  console.log(req.body);
id = req.body._id
console.log(` inside deleted ${id}`);
await knowledgepartnerData.findByIdAndDelete({ '_id': id },
(err, result) => {
  if (err) {
      res.send(false)
  } else {
      res.send(true)
  }
});
});

module.exports = knowledgepartneradminRouter;
