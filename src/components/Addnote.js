import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const Addnote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title:"",description:"",tag:""});

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
      <h4>Add a note</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" name="title" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <input type="text" className="form-control" name="note" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" name="tag" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </>
  );
};
