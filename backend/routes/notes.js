const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

//route 1 : fetch all notes GET

router.post('/',(req,res)=>{
   
    res.json([]);
})

module.exports = router;