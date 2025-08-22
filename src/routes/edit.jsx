import { useState, useContext } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NotesContext } from "../contexts";
import { nanoid } from 'nanoid';

export const Route = createFileRoute('/edit')({
  component: AddNote,
})

function AddNote() {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;
  const [notes, setNotes] = useContext(NotesContext)

  const handleAddNote = (text) => {
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};


export default AddNote;
