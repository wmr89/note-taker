const fs = require("fs");
// Import Express.js
const express = require("express");
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");
// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

const notesData = require("./db/db.json");

const uuid = require("./helpers/uuid");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const { error } = require('console');

// Static middleware pointing to the public folder
app.use(express.static("public"));

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notesData));

app.post("/api/notes", (req, res) => {
  res.json(`${req.method} request received`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    //const readFile = fs.readFileSync("./db/db.json");
    //const arr = JSON.parse(readFile.toString());

    notesData.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(arr), (err) => {
      err ? console.error(err) : console.log("Note has been saved");
    });

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
  } else {
    res.status(500).json("Error saving new note");
  }
});


// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
