const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: String, // Field to store the user's ID
    title: String,
    content: String
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
