import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import { NotesContext } from "../contexts";

export const Route = createRootRoute({
  component: () => {

    const [notes, setNotes] = useState([
      {
        id: nanoid(),
        text: "welcome to note-mono. create a new note or edit this one to get started",
        date: "13/32/2027",
      },
    ]);

    // const [searchText, setSearchText] = useState("");

    const [darkMode, setDarkMode] = useState(false);

    /* useEffect(() => {
      const savedNotes = JSON.parse(
        localStorage.getItem("react-notes-app-data"),
      );

      if (savedNotes) {
        setNotes(savedNotes);
      }
    }, []); // empty dependency array runs once on first load

    useEffect(() => {
      localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    }, [notes]); */

    /* const addNote = (text) => {
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
    }; */

    const notesHook = useState([]);

    return (
      <NotesContext.Provider value={notesHook}>
        <div className={`${darkMode && "dark-mode"}`}>
          <div className="container">
            <Header handleToggleDarkMode={setDarkMode} />
            <Outlet />
          </div>
        </div>
      </NotesContext.Provider>
    );
  },
});

/*   what goes in Outlet:
 *   think i'll use context for these

        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText),
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
*/
