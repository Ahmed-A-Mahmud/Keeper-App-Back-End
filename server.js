const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Note = require("./noteModel"); // Import the Note model
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});


// CORS configuration
const corsOptions = {
  origin: 'https://ahmed-m-keeper-app-development-technology-8dudc6aiz.vercel.app', // Your frontend's URL
  optionsSuccessStatus: 200
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

// Your MongoDB URI
const uri =
  "mongodb+srv://am5737:500458As@cluster0.1v0usqs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

const port = process.env.PORT || 5000; // Use Heroku's port or 5000 for local
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

// Get all notes for a user
app.get('/api/notes', async (req, res) => {
  const userId = req.query.userId;
  try {
    const notes = await Note.find({ userId });
    res.send(notes);
  } catch (error) {
    res.status(500).send("Error fetching notes");
  }
});

// Add a new note for a user
app.post('/api/notes', async (req, res) => {
  const newNote = new Note({
    userId: req.body.userId, // Include the user's ID
    title: req.body.title,
    content: req.body.content
  });

  try {
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(400).send("Error saving note");
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  const userId = req.body.userId; // Get the user's ID from the request

  try {
    const result = await Note.findOneAndDelete({ _id: noteId, userId });
    if (result) {
      res.json({ message: "Note deleted" });
    } else {
      res.status(404).send("Note not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting note");
  }
});

// Error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});
