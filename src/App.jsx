// import React from "react"; // not needed because .jsx
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

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

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []); // empty dependency array runs once on first load

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

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
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText),
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
  // "prop drilling":
  // handleAddNote is passed as a prop to NotesList ^^^ and then to AddNote so that
  // the child element AddNote can change the state of the parent element App
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
