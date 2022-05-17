import React, {useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { Addnote } from "./Addnote";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
      getNotes()
    }, [])
    
  return (
    <>
    <Addnote/>
    <div className="row">
         <h4 className="my-3">Your Notes</h4>
        {notes.map((note)=>{
          return <Noteitem key={note._id} note={note} />
        })}
    </div>
    </>
  )
}

export default Notes