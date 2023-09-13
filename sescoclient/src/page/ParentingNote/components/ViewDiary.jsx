import React from "react";

const ViewDiary = ({ selectdate }) => {
  

  return (
    <div>
      <p>{selectdate.title}</p>
      <p>{selectdate.content}</p>
      <p>{selectdate.tag}</p>
      <p>{selectdate.img}</p>
      
      {/* {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))} */}

      
    </div>
  );
};

export default ViewDiary;
