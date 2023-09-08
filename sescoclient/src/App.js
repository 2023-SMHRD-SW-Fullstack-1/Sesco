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

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* main : /m, Note : /, Login : /l(영어) */}
        <Route path="/m" element={<Main />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/g" element={<Note />}></Route>
        <Route path="/tip" element={<Tip />}></Route>
        <Route path="/" element={<Diarycopy />}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
