import React from "react";

const ViewDiary = ({ dtitle, dcontent, idx, tags }) => {
  console.log(dtitle);
  console.log(dcontent);
  console.log(tags);

  return (
    <div>
      {dtitle}
      {dcontent}
      {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </div>
  );
};

export default ViewDiary;
