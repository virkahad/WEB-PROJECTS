const express = require('express');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');
const fetcUser = require('../middleware/fetchUser')
const router = express.Router();


// route:1 for getting all the notes
router.post('/GetAllNotes', fetcUser, async (req, res) => {

    let notes = await (Notes.find({ user: req.user.id }));
    res.json(notes);
})

// route:2 for adding all the notes
router.post('/AddNote', fetcUser, [
    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "min length is 5").isLength({ min: 5 }),
], async (req, res) => {

    const err = await validationResult(req);
    if (!err.isEmpty()) {
        return res.send({ errors: err.array() });
    }
    try {

        const { title, description, tag } = req.body;
        console.log(req.user.id)
        let newnote = await new Notes({
            title, description, tag, user: req.user.id
        });
        console.log("note creation is passed")
        const savedNote = await newnote.save();
        console.log(savedNote)
        res.json(savedNote)
    }
    catch (error) {
        res.send("nternal server error");
    }

})


// route:3 for updating the note

router.put('/Updating/:id', fetcUser, async (req, res) => {
    try {

        const newnote = {};
        const { title, description, tag } = req.body;

        if (title) { newnote.title = title; }
        if (description) { newnote.description = description; }
        if (tag) { newnote.tag = tag; }

        let note = await (Notes.findById(req.params.id))
        if (!note) {
            return res.status(401).json({ "error": "404 not found" })
        }

        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("access Denied..")
        }
        console.log("checking the user id and note user id")


        note = await (Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true }))
        console.log("updating the note")
        res.json({ note })

    }
    catch (error) {
        res.send("nternal server error");
        console.log(error)
    }

})

// route:4 deleting the notes

router.delete('/Delete/:id', fetcUser, async (req, res) => {
    try {

        let note = await (Notes.findById(req.params.id))
        if (!note) {
            return res.status(401).json({ "error": "404 not found" })
        }

        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("access Denied..")
        }

        note = await (Notes.findByIdAndDelete(req.params.id))
        console.log("updating the note")
        res.json({ note:note,"seccuess":"note deleted..." })

    }
    catch (error) {
        res.send("nternal server error");
        console.log(error)
    }

})



module.exports = router;