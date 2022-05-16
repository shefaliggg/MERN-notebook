import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";


export const Home = () => {
   const context = useContext(noteContext);
   const {notes, setNotes} = context;
    return (
      <div className="container my-3">
        <h4>Add a note</h4>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Note
            </label>
            <input
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <h4 className="my-3">Your Notes</h4>
        {notes.map((note)=>{
          return note.title;
        })}
      </div>
    );
  }


export default Home;
