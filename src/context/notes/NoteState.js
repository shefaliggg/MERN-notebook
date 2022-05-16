import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "6280a40ff5a335ff2ea7ee31",
          "user": "627e408ef8ea1ad7bf12b812",
          "title": "this is title",
          "description": "this is description",
          "tag": "tagme",
          "date": "2022-05-15T06:56:15.390Z",
          "__v": 0
        },
        {
          "_id": "6280a488f5a335ff2ea7ee33",
          "user": "627e408ef8ea1ad7bf12b812",
          "title": "this is title",
          "description": "this is description",
          "tag": "tagme",
          "date": "2022-05-15T06:58:16.582Z",
          "__v": 0
        },
        {
          "_id": "6280a7421392ae0a265577cc",
          "user": "627e408ef8ea1ad7bf12b812",
          "title": "thi22khs is title",
          "description": "thishkj is 22description",
          "tag": "ta22gme",
          "date": "2022-05-15T07:09:54.071Z",
          "__v": 0
        }
      ];

      const[notes, setNotes] = useState(notesInitial);

      return(
          <NoteContext.Provider value={{notes, setNotes}}>
              {props.children}
          </NoteContext.Provider>
      )
  
};

export default NoteState;
