import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';


function App() {
  return (
    <>
    <NoteState>
        <BrowserRouter>
        <Navbar/>
        <Alert message={"Note Saved"}/>
          <Routes>
            <Route exact path="/" element={<Home/>}  /> 
            <Route exact path="/about" element={<About/>} /> 
          </Routes>
        </BrowserRouter>
      </NoteState>  
    </>
  );
}

export default App;
