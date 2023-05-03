import React, { useState , useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  //first fetch the data from the local storage
  let storedNotes = JSON.parse(localStorage.getItem('notesKey'));
  if(storedNotes === null)
    storedNotes = [];

  const [notes, setNotes] = useState(storedNotes);

  //this useEffect updates the data stored in the local storage the state of items are changed
  useEffect(() => {
    localStorage.setItem('notesKey', JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    //if we have an empty note we do not add it
    if(newNote.content === "" && newNote.title==="")
      return;
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>

      <Header />
        <div className="container-fluid">
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
