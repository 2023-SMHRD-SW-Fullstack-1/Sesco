
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Main1 from "./page/Main1";
import Note from "./page/ParentingNote/Note";
import Gallery from "./page/ParentingGallery/Gallery";
import Login from "./components/Login";
import Tip from './page/ParentingTip/TipMain';
import Join from "./components/Join";
import Main2 from "./page/Main2";

import GoogleLog from "./page/components/GoogleLog"
import Diarycopy from "./page/ParentingNote/components/Diarycopy";




 
function App() {
  return (
    <>

    <Header/>
    <Routes>
      <Route path="/" element={<Main1/>}></Route>
      <Route path="/main" element={<Main2/>}></Route>
      <Route path="/gallery" element={<Gallery/>}></Route> 
      <Route path="/note" element={<Note/>}></Route>
      <Route path="/tip" element={<Tip/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
      <Route path="/diary" element={<Diarycopy/>}></Route>
      <Route path="/google" element={<GoogleLog/>}></Route>


    </Routes>


      {/* <Footer /> */}
    </>
  );
}

export default App;
