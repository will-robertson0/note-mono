import Note from "../components/Note";
import AddNote from "../components/AddNote";
import Search from "../components/Search";
import { createFileRoute } from "@tanstack/react-router";
import { NotesContext } from "../contexts";
import { useState, useContext, useEffect} from "react";
import { nanoid } from "nanoid";



const NotesList = () => {
  const [notes, setNotes] = useContext(NotesContext);

  const [searchText, setSearchText] = useState("");

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

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

  useEffect(() => { // retrieve saved notes from localStorage
    const savedNotes = JSON.parse(
      localStorage.getItem("react-notes-app-data"),
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []); // empty dependency array runs once on first load

  useEffect(() => { // save notes to localStorage on every change of notes[]
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);
  
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText),
  );

  return (
    <>
    <Search handleSearchNote={setSearchText} />
    <div className="notes-list">
      {filteredNotes.map((note) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={deleteNote}
        />
      ))}
      <AddNote handleAddNote={addNote} />
    </div>
    </>
  );
};

export const Route = createFileRoute("/notesList")({
  component: NotesList,
});
