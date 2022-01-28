const express = require('express');
const industrypartneradminRouter = express.Router();
const industrypartnerData = require('../../modals/industrypartnerData');
const fs = require('fs')

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
industrypartneradminRouter.post('/add', cpUpload, async (req, res) => {
  try{
    console.log(req.body)
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await industrypartnerData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});


industrypartneradminRouter.post('/remove',async (req,res)=>{
   try{
  id = req.body._id;
  await industrypartnerData.findByIdAndDelete({"_id":id})
  .then((indus)=>{
      console.log(indus.image);
      fs.unlinkSync(indus.image);     
      indus.remove()   
      res.send(indus);
  })  
}
catch{
  res.send(false);
} 
})


module.exports = industrypartneradminRouter;
