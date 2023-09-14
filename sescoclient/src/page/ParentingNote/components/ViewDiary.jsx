import React, { useEffect,useState } from "react";
import styled from 'styled-components';

const ViewDiary = ({ selectdate }) => {

  const [tags, setTags] = useState([]);

useEffect(() => {
  if (selectdate.tag) {
    const tagArray = selectdate.tag.split('#').filter(tag => tag);
    setTags(tagArray);
  }
}, [selectdate]);
  
  console.log(tags);

  selectdate.tag.split()
  return (
    <div>
      <p>{selectdate.title}</p>
      <p>{selectdate.content}</p>
      
      {selectdate.img && <p><img src={"data:image/;base64,"+selectdate.img} alt="" style={{width : "100px", height: "100px"}} /></p>}
      
      <TagBox>
        
          
      {tags.map((tag, index) => (
    <TagItem key={index} >
      <Button>{tag}</Button>
    </TagItem>
  ))}
    
      </TagBox>
      {/* {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))} */}

      
    </div>
  );
};

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

export default ViewDiary;
