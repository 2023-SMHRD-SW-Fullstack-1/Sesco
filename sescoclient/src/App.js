
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Main from "./page/Main";
import Tip from "./page/ParentingTip/Tip";
import Note from "./page/ParentingNote/Note";
import Gallery from "./page/ParentingGallery/Gallery";
import Login from "./components/Login";
import Diarycopy from "./page/ParentingNote/components/Diarycopy";
import Tip from './page/ParentingTip/TipMain';


function App() {
  return (
    <>

    <Header/>
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/gallery" element={<Gallery/>}></Route> 
      <Route path="/note" element={<Note/>}></Route>
      <Route path="/tip" element={<Tip/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
      <Route path="/a" element={<Diarycopy />}></Route>
    </Routes>


      <Footer />
    </>
  );
}

export default App;
