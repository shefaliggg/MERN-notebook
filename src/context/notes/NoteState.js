import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  //fetch all notes
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
            'Accept': '*/*',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
          },
          body: JSON.stringify({title,description,tag})
        });
           
        const note = await response.json();
        setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    //api delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
      },
    });

    const json = response.json();
    console.log(json);

    console.log('Deleting the note id'+id);

    //client delete
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
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ZTQwOGVmOGVhMWFkN2JmMTJiODEyIn0sImlhdCI6MTY1MjUxNDY5Nn0.3Soq7WjVlvUGBriMuyR5trA1_OWoztnocb1UhsVuYLE',
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
    console.log(json)

    //edit in client api
   let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
