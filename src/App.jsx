// import React from "react"; // not needed because .jsx
import { createRoot } from "react-dom/client";
import NotesList from "./components/NotesList";
import { useState } from "react";
import { nanoid } from "nanoid";
import Search from './components/Search';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "lorem ipsum somethin",
      date: "13/32/2027",
    },
    {
      id: nanoid(),
      text: "lorem ipsum second",
      date: "14/32/2027",
    },
    {
      id: nanoid(),
      text: "lorem ipsum third",
      date: "15/32/2027",
    },
  ]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    // <nav class="main-navbar">
    //         <a href="#" class="back-button">
    //             <img src="./media/back-button.webp" alt="clickable back button image" />
    //         </a>
    // </nav>
    <div className="container">
      <Search/>
      <NotesList
        notes={notes}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
  );
  // "prop drilling":
  // handleAddNote is passed as a prop to NotesList ^^^ and then to AddNote so that
  // the child element AddNote can change the state of the parent element App
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
