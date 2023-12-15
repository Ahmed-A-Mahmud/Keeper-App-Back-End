const mongoose = require('mongoose');
const Note = require('./noteModel'); // Adjust the path as necessary
const notes = require('./notes'); // Adjust the path as necessary

// Replace with your MongoDB URI
const uri = "mongodb+srv://am5737:500458As@cluster0.1v0usqs.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', async () => {
    console.log("Connected to MongoDB");

    // Check if the database is empty
    const existingNotes = await Note.countDocuments();
    if (existingNotes > 0) {
        console.log("Notes already exist in the database");
        return;
    }

    // Insert notes
    try {
        for (let note of notes) {
            let newNote = new Note({
                title: note.title,
                content: note.content
            });
            await newNote.save();
        }
        console.log("Notes added to the database");
    } catch (error) {
        console.error("Error adding notes to the database:", error);
    } finally {
        mongoose.disconnect();
    }
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});
