import React, { useContext } from "react";
import Local from "./Local"
import { LocalContext } from "../localContext";

const LocalList = () => {

  const {clickedLocal, setClickedLocal} = useContext(LocalContext)

  return (
    <div>
      <Local clickedLocal={clickedLocal}></Local>
    </div>
  )
}

export default LocalList

