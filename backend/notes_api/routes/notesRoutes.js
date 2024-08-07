const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {addNote, getNote, deleteNote, updatePosition, updateContent} = require('../Controller/NoteController');


router.post('/create/:email',auth ,addNote)
router.get('/fetch/:email',auth ,getNote)
router.delete('/delete/:id',auth ,deleteNote)
router.put('/updatePosition/:id', auth , updatePosition)
router.put('/updateContent/:id', auth , updateContent)

module.exports = router