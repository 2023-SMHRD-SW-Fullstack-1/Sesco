import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateDiary from "./CreateDiary";
import "./diary.css";
import ViewDiary from "./ViewDiary";
import axios from "axios";
import moment from 'moment';
import "../../../../src/Fullcalendar.css"
import { render } from "@fullcalendar/core/preact";


const Diarycopy = ({noteData}) => {
  //noteData에는 kid_seq, note_seq, kid_name... 노트 객체 전달받음

  
  // 전체 일기 리스트 관리
  const [listDiary, setListDiary] = useState([]);
  
  // -------------------------fullcalendar start-------------------------------------//

  //선택한 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜마다 바뀐 일기 리스트 저장
  const [selectedDiaryList, setSelectedDiaryList] = useState()


  //날짜변경 시 일기를 해당 날짜 기준으로 필터링
  useEffect(()=>{
    const tempDiaryList = listDiary.filter((diary)=> diary.date == formatDate(selectedDate))
    setSelectedDiaryList(tempDiaryList)  
    console.log("너 뭐들었니?",tempDiaryList);
    setListClickVisible(true);
  },[selectedDate])

  
  //날짜 맞춰주는 함수 : 2023-09-09
  function formatDate(date) {
    console.log(date);
    return moment(date).format('YYYY-MM-DD');
  }
  
  // -------------------------------fullcalendar End ---------------------------------//


  // --------------------tag start------------------//



  // useEffect(()=>{
  //   console.log("tjlclflcujwmx", searchResult)
   
  // }, [listDiary])

  // --------------------tag   end------------------//



  // --------------------------------------일기 start-----------------------------------//


   const [isCalendarShow, setIsCalendarShow] = useState(true);
    const [initialDate, setInitialDate] = useState(noteData.n_s_date);
  
    useEffect(() => {
      setIsCalendarShow(false)
      // noteData.n_s_date 값이 변경될 때마다 initialDate를 업데이트합니다.
      setInitialDate(noteData.n_s_date)
    }, [noteData.n_s_date])


  // 일기 리스트 초기화
  useEffect(() => {
    fetchDiaryList(noteData.tagSearchText);
  }, [noteData]);

  useEffect(()=>{
    setIsCalendarShow(true)
  },[initialDate])


  
  //일기 작성화면으로 전환 
  const [isClick, setIsClick] = useState(false);
  
  
  //일기View 페이지로 전환
  const [listClickVisible, setListClickVisible] = useState(false);

  function CreateDiaryForm() {
    setIsClick(!isClick);
  }

  
  //DB에 저장된 일기 리스트 불러오기
  const fetchDiaryList = (tag) => {
    axios.post(`http://localhost:8081/sesco/diary/selectlist`,{
      note_seq : noteData.noteSeq
    })
      .then((res) => {
        const fetchedEvents = res.data.diary.map((event, idx) => {
          return {
            d_seq: event.d_seq,
            title: event.d_title,
            date: event.d_date,
            content: event.d_content,
            tags: event.d_tags.split("#"),
            img: event.img_real_name
          }
        }) 
        if(tag){
          const temp = []
          console.log(tag)
          const filterList = fetchedEvents.filter((item) => 
            item.tags.includes(tag) 
          )
    
          filterList.map((item)=>temp.push({
            d_seq : item.d_seq, 
            title : item.title,
            date : item.date,
            content : item.content,
            tags : item.tags,
            img : item.img,
          }))
          setListDiary([...temp])
        }else{
          setListDiary(fetchedEvents);
        }
        console.log("노트에서 불러옴", noteData);
      })
      .catch((err) => {
        console.log("리스트 오류", err);
      });
    }

    //일기 작성 완료 처리 함수
    function onComplete(title, content, imgFile, tags) {
      
      console.log(title, content, tags, imgFile)

    if (selectedDate && title && content) {

      const newDiary = {
        date: formatDate(selectedDate),
        title: title,
        img : imgFile,
        content: content,
        tags: tags,
      };
      
      //현재 일기 값에서 일기작성한 값 추가해주기
      setListDiary([...listDiary, newDiary]);
      //한국 표준시 이렇게 나옴 초기상태
      console.log("seletedDate", selectedDate);
      //DB값 전부 불러옴
      console.log("diarydate", listDiary);
      //이게 끝나면 CreateDiary로 감
    }

      setIsClick(false);
      if( selectedDate != null){
        setSelectedDate();
      }
    }

    //해당 날짜의 일기 리스트 출력
    function handleDateClick(info, index) {
      console.log("handleDateClick");
      setSelectedDate(formatDate(info.date));
      setSelectedDiaryList()
    }

  // --------------------------------------일기 end-----------------------------------//

  
  return (
    // 수첩칸
    <div className="diary-whole-container">
      <div className="diary-kids-tag">
        <div className="diary-kid-name">{noteData.kidName}</div>
      </div>

      {/* 왼쪽칸 */}
      <div className="diary-left-container">
        <div className="diary-page-inner">
          <div className="diary-left-calendar">
            {isCalendarShow &&
            <FullCalendar
              //풀캘린더 플러그인
              timeZoneParam="YYYY-MM-DD"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              //클릭했을 때 날짜 가져오는 메서드
              dateClick={handleDateClick}
              //일기 작성했을 때 이벤트 추가
              // events={events}
              events={listDiary}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "today",
                center: "title",
                end: "prev,next",
              }}
              
              //눌렀을 때 해당 날짜 칸 색깔 강조
              selectable true
              eventDisplay={"block"}
              eventTextColor={"#FFF"}
              eventColor={"rgb(236, 236, 231)"}
              height={"530px"}
              width={"100%"}
              initialDate={initialDate}
            />
          }
          </div>
          
          

          {/* <div
            style={{
              width: "455px",
              height: "100px",
              marginTop: "10px",
              border: "solid 2px red",
            }}
          >
            일기 리스트 출력
            여기서 누른 날짜의 일기리스트를 제공
            <div className="c">
                
            </div>
            
          </div> */}
        </div>
      </div>

      {/* 오른쪽칸 */}
      <div className="diary-right-container">
        <div className="diary-page-inner">
          {/* 선택된 날짜 출력 */}
          {/* {selectedDate && (
            <p>선택된 날짜: </p>
          )} */}

          {/* 일기 작성 폼 */}
          {isClick && (
            // CreateDiary 컴포넌트에 선택된 날짜 전달 (props로)
            // 예시: <CreateDiary selectedDate={selectedDate} />
            // 필요에 따라 선택된 날짜를 CreateDiary 컴포넌트로 전달해주세요.
            <CreateDiary selectedDate={selectedDate} onComplete={onComplete}formatDate={formatDate} noteData={noteData}/>
          )}
        {listClickVisible && selectedDiaryList && selectedDiaryList.length > 0 && (
  <ViewDiary
  fetchDiaryList={fetchDiaryList} selectdate={selectedDiaryList} noteData={noteData} setListClickVisible={setListClickVisible}
  />  
)}
        </div>
        <button className="diaryAddBtn" onClick={()=>CreateDiaryForm()}>+</button>

      </div>
    </div>
  )
}

export default Diarycopy