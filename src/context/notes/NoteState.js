import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  //Add a note
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);

    
};

  //Add a note
  const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
          },
          body: JSON.stringify({title,description,tag})
        });
        
    
    let note = {
      _id: "6280a488f5a335ff2ea7ee33",
      user: "627e408ef8ea1ad7bf12b812",
      title: "test",
      description: "test this is description",
      tag: "tagme",
      date: "2022-05-15T06:58:16.582Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    console.log("deleting the note" + id);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
  

    //edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
