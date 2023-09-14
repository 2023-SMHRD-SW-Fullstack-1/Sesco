import React, { useEffect, useState } from "react";
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
    <Container>
    <Title>{selectdate.title}</Title>
    <Content>{selectdate.content}</Content>

    
    {selectdate.img && <img src={"data:image/;base64," + selectdate.img} alt="" style={{width: "100px", height: "100px"}} />}
    
    <TagBox>
      {tags.map((tag, index) => (
        <TagItem key={index} >
          {tag}
        </TagItem>
      ))}
    </TagBox>
  </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.p`
  margin-top: 10px;
`;

const ImageContainer = styled.p`
   width: "50px";
   height:"50px";
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;


export default ViewDiary;
