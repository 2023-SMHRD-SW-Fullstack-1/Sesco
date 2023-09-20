import React, { useEffect, useState } from "react";
import './modal.css'
import ImageGallery from "react-image-gallery";
import DiaryContent from "./DiaryContent";

function ModalGallery({closeModal, imgInfo}) {

  // imgInfo에서 일기 내용 정보와 이미지 내용을 구분
  const [imgData, setImgData] = useState()
  const [diaryData, setDiaryData] = useState()

  //일기 내용 정보와 이미지 내용을 구분
  useEffect(()=>{
    const tempImgData = []
    const tempDiaryDate = []
    imgInfo?.map((info)=>(
      tempImgData.push({
        img : info.img
      }),
      tempDiaryDate.push({
        d_title : info.d_title,
        d_date : info.d_date, 
        d_content : info.d_content,
        d_tags : info.d_tags,
        note_seq : info.note_seq
      })
    ))
    setImgData([...tempImgData])
    setDiaryData([...tempDiaryDate])
  },[])

// --------------------ImgGallery Start -----------------//

//imagData를 전달 가능한 형식으로 바꾼 데이터
  const [img, setImg]= useState(null)
  

//imgData 업데이트 되면 다시 parsing 
  useEffect(()=>{
      const images = [];
      imgData?.map((name)=>
        images.push({
          original : name.img,
          thumbnail : name.img
        })
      )
      setImg([...images])
    },[imgData])
//--------------------ImgGallery End----------------------//

  return (
    <div className="gallery-modal" onClick={()=>closeModal(false)}>
      <div className="gallery-modal-body" onClick={(e) => e.stopPropagation()}>
       { img && <div><ImageGallery items={img} /></div> }
      {/* <button classNam="modal-info-btn">eeeeeeeee</button> */}
      {/* <DiaryContent style={{position:"absoulte"}} diaryData={diaryData}></DiaryContent> */}
      </div>
    </div>
  );
}

export default ModalGallery;
