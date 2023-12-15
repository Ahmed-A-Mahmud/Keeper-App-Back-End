const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Note = require("./noteModel"); // Import the Note model

app.use(cors());
app.use(bodyParser.json());

// Your MongoDB URI
const uri =
  "mongodb+srv://am5737:500458As@cluster0.1v0usqs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

// Get all notes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});

// Add a new note
app.post("/api/notes", async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.send(newNote);
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedNote);
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send({ message: "Note deleted" });
});

// Error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});
