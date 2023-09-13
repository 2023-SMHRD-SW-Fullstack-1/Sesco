import React from "react";

const ViewDiary = ({ diary }) => {
  

  return (
    <div>
      <p>{diary.title}</p>
      <p>{diary.content}</p>
      {/* {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))} */}

      
    </div>
  );
};

export default ViewDiary;
