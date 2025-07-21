// import React from "react"; // not needed because .jsx
import { createRoot } from "react-dom/client";
import NotesList from './components/NotesList';
import { useState } from "react";
import { nanoid } from 'nanoid';
 
const App = () => {
    const [notes, setNotes] = useState([{
            id: nanoid(),
            text: "lorem ipsum somethin",
            date: "13/32/2027"
        },
        {
            id: nanoid(),
            text: "lorem ipsum second",
            date: "14/32/2027"
        },
        {
            id: nanoid(),
            text: "lorem ipsum third",
            date: "15/32/2027"
        },
    ]);

  return (
    // <nav class="main-navbar">
    //         <a href="#" class="back-button">
    //             <img src="./media/back-button.webp" alt="clickable back button image" />
    //         </a>
    // </nav>
        <div className="container">
            <NotesList notes={notes}/>
        </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
