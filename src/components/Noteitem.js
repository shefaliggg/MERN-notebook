import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note} = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
        <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-thin fa-trash-can mx-3 my-1" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-thin fa-pen-to-square my-1"></i>
        </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">Tag: {note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
