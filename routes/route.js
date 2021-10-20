const express = require("express");

const router = express.Router();
const SafeListSchemaCopy = require("../models/safeList");

//Get back all the posts
router.get("/", async (req, res) => {
  try {
    const safes = await SafeListSchemaCopy.find();
    res.status(200).json(safes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//submits the post
router.post("/", async (req, res) => {
  const safeList = new SafeListSchemaCopy({
    safename: req.body.safename,
    owner: req.body.owner,
    type: req.body.type,
    description: req.body.description,
    secrets: null,
  });
  try {
    const saveSafeList = await safeList.save();
    res.status(200).json(saveSafeList);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//specific safe from id
router.get("/:safeId", async (req, res) => {
  try {
    const safe = await SafeListSchemaCopy.find({ _id: req.params.safeId });
    res.status(200).json(safe);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//delete safe
router.delete('/:safeId', async (req,res)=>{
  try{
      const removeSafe = await SafeListSchemaCopy.findByIdAndRemove({_id:req.params.safeId});
      res.status(200).json(removeSafe);
  }catch(err){
      res.status(500).json({message:err});
  }
});
//update safe
router.patch('/:safeId', async (req,res)=>{
  try{
      const updateSafes = await SafeListSchemaCopy.updateOne(
          {_id:req.params.safeId},
          {$set:{
              safename:req.body.safename,
              owner:req.body.owner,
              type:req.body.type,
              description:req.body.description
          }}
      );
      res.status(200).json(updateSafes);
  }catch(err){
      res.status(500).json({message:err});
  }
});


//getting secrets
router.get('/secrets/:safeId', async (req,res)=>{
    try{
        const safe = await SafeListSchemaCopy.findOne({_id:req.params.safeId});
        res.status(200).json(safe);
    }catch(err){
        res.status(500).json({message:err});
    }
});

//update secrets
router.patch('/secrets/:safeId', async (req,res)=>{
  try{
      const updateSafes = await SafeListSchemaCopy.updateOne(
          {_id:req.params.safeId},
          {$push:{
              secrets:req.body.secrets
          }}

      );
      res.status(200).json(updateSafes);
  }catch(err){
      res.status(500).json({message:err});
  }
});



module.exports = router;
