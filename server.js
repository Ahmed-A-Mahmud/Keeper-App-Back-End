const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = "mongodb+srv://am5737:500458As@cluster0.1v0usqs.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose Schema for Notes
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Mongoose Model for Notes
const Note = mongoose.model('Note', noteSchema);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) res.status(404).send("No note found");
    res.status(200).send("Note deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

