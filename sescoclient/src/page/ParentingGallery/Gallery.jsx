import React, { useState } from "react";
//css 이름
import "./gallery.css";

import Banner from "./components/Banner";
import GalleryMap from "./components/GalleryMap";
import LocalList from "./components/LocalList";

const Gallery = () => {
  const list = ["광주", "화순", "나주", "담양", "목포"];

  const [imgList, setImgList] = useState([]);

  return (
    <>
      <Banner />
      <div style={{ display: "flex" }}>
        <div style={{ width: "1080px", height: "800px" }}>
          <GalleryMap></GalleryMap>
        </div>
        <div>
          <LocalList></LocalList>
        </div>
      </div>
    </>
  );
};

export default Gallery;
