import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { NotesContext } from "../contexts";
import { nanoid } from 'nanoid';

export const Route = createRootRoute({
  component: () => {

    const [notes, setNotes] = useState([
      {
        id: nanoid(),
        text: "welcome to note-mono. create a new note or edit this one to get started",
        date: "13/32/2027",
      },
    ]);

    useEffect(() => {
      // retrieve saved notes from localStorage
      const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))

      if (savedNotes) {
        setNotes(savedNotes)
      }
    }, []) // empty dependency array runs once on first load

    useEffect(() => {
      // save notes to localStorage on every change of notes[]
      localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
    }, [notes])

    const [darkMode, setDarkMode] = useState(false);

    // const notesHook = useState([]);

    return (
      <NotesContext.Provider value={[notes, setNotes]}>
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
