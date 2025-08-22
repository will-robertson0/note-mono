import Note from '../components/Note'
import Search from '../components/Search'
import { createFileRoute, Link } from '@tanstack/react-router'
import { NotesContext } from '../contexts'
import { useState, useContext, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: NotesList,
})

function NotesList() {
  const [notes, setNotes] = useContext(NotesContext)

  const [searchText, setSearchText] = useState('')

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }


  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText),
  )

  return (
    <>
      <Search handleSearchNote={setSearchText} />
      <div className="notes-list">
        <div className="note new">
          <Link to="/edit">
            do it make a new note i dare you
          </Link>
        </div>
        {filteredNotes.map((note) => (
          <Note
            id={note.id}
            text={note.text}
            date={note.date}
            handleDeleteNote={deleteNote}
          />
        ))}
      </div>
    </>
  )
}
