const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
<<<<<<< HEAD
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
=======
const Notes = require('../models/Notes');

//route 1 : fetch all notes GET
>>>>>>> 6e093d752777fec6368061edca04fd9eb2aba2b8

//route 1 : fetch all notes GET

router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

// Route: update an existing note

router.put('/updatenote/:id', fetchuser, async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            //create a new note
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};
           
            //find the note to be updated n update it
            let note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not found");
            }

            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id,
                {$set: newNote},{new:true});
                res.json({note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }); 


    // Route: delete an existing note

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find the note to be updated n delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
            res.json({"Success": "Note has been deleted",note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}); 
module.exports = router;