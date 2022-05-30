import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const Addnote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:""});

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert('Note Added Successfully','success');
    }

    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
      <h4>Add a note</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" value={note.title} name="title" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <input type="text" className="form-control" value={note.description} name="description" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" value={note.tag} name="tag" onChange={handleChange} />
        </div>
        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </>
  );
};
