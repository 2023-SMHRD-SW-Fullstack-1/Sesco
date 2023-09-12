import React, { useContext, useEffect } from "react";
import Local from "./Local"
import { LocalContext } from "../localContext";

const LocalList = () => {

  const {clickedLocal, setClickedLocal} = useContext(LocalContext)
  
  useEffect(()=>{
  },[clickedLocal])

  return (
    <div>
    {clickedLocal && 
      <Local clickedLocal={clickedLocal}></Local>
    } 
    </div>
  )
}

export default LocalList

