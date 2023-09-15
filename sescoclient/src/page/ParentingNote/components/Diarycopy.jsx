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


const Diarycopy = () => {
  //일기 추가 클릭했을 때 true로 되고 일기작성 폼 출력
  const [isClick, setIsClick] = useState(false);

  //일기 리스트중 하나 눌렀을 때 화면 보이거나 안보이게 하기
  const [listClickVisible, setListClickVisible] = useState(false);

  //선택한 날짜
  const [selectedDate, setSelectedDate] = useState(null);

  //CreateDiary에서 작성한 제목 가져오기
  const [createFormTitle, setCreateFormTitle] = useState(null);

  const [createFormContent, setCreateFormContent] = useState(null);



  //이미지 저장
  const [image, setImage] = useState("");

  //일기 추가 시 이벤트 처리
  const [events, setEvents] = useState([]);

  // 일기 리스트
  const [listDiary, setListDiary] = useState([]);

  // 날짜마다 바뀐 일기 리스트 저장
  const [selectedDiaryList, setSelectedDiaryList] = useState()

  // 일기 리스트 상세정보를 담는 상태 변수
  const [selectedDiary, setSelectedDiary] = useState(null);
  


  //"데이터 없어?"하고 다시 여기로 옴
  // console.log(moment(selectedDate).format('YYYY-MM-DD'))
  // --------------------------------------------------------------------------------------------------------------------------------------------------------



  //해당 날짜의 일기 리스트 출력
  function handleDateClick(info) {
    console.log("handleDateClick");
    setSelectedDate(info.date);
    setListClickVisible(false);
  
    // const localDateString = formatDate(info.date);
    
    
  }



  //날짜 맞춰주기 : 2023-09-09
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }




  function onComplete(title, content, imageFile, tags) {
    //작성완료 눌렀을 때 바로 여기로 옴
    console.log("데이터 보내는거니?");
    setCreateFormTitle(title);
    setCreateFormContent(content);
    //title에는 아직 null값 뜸 이유를 모르겠음
    console.log(createFormTitle);
    console.log("태그", tags);

    if (selectedDate && title && content) {
      //const localDateString = ...: 선택된 날짜에서 현재 시스템의 타임존 오프셋을 빼서 UTC로부터 로컬 시간으로 변환하고, 그 결과를 'YYYY-MM-DD' 형식의 문자열로 만듭니다.
      // const localDateString = new Date(
      //   selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      // )
      //   .toISOString()
      //   .split("T")[0];

      //db 리스트 값 가져오기?
      const newEvent = { title: title, date: formatDate(selectedDate) };
      setEvents([...events, newEvent]);

      const newDiary = {
        date: formatDate(selectedDate),
        title: title,
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
  }

  //해당 날짜의 일기 상세정보
   function ClickDiary(index) {
    console.log("ClickDiary");
    console.log(selectedDiaryList)
    const diary = selectedDiaryList[index];
    console.log("다이어리",diary);
    setListClickVisible(true)
    setSelectedDiary(diary);
    

  }

  function CreateDiaryForm() {
    setIsClick(!isClick);
  }

  //DB에 저장된 일기 리스트 이벤트 처리
  useEffect(()=>{
    axios.post(`http://localhost:8081/sesco/diary/selectlist`)
    .then((res)=>{
      console.log(res)
      const fetchedEvents = res.data.diary.map((event,idx)=>{
        console.log("왔니",res.data);
        return{
          title : event.d_title,
          date : event.d_date,
          content : event.d_content,
          tag : event.d_tags,
          img : event.img_real_name
        }
      })
      setListDiary(fetchedEvents);
    })
    .catch((err)=>{
      console.log("리스트 오류",err);
    })
  },[])

  //  DB에 저장된 일기 리스트 이벤트 처리
  //  
  useEffect(()=>{
    setListClickVisible(!listClickVisible)
    // setIsViewDiaryVisible(!isViewDiaryVisible)
    setSelectedDiaryList(listDiary.filter((diary)=> diary.date == formatDate(selectedDate)))
    console.log("필터링 완료")
  },[selectedDate])

  useEffect(() => {
    setListClickVisible(false)
  }, [selectedDate]);
  




  return (
    // 수첩칸
    <div className="diary-whole-container">
      <div className="diary-kids-tag">
        <div className="diary-kid-name">현민이</div>
      </div>

      {/* 왼쪽칸 */}
      <div className="diary-left-container">
        <div className="diary-page-inner">
          <div className="diary-left-calendar">
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
              eventColor={"#F2921D"}
              height={"300px"}
            />
          </div>

          <div>
            <button
            className="diaryAddBtn"
              onClick={CreateDiaryForm}
              style={{ width: "460px", height: "100px", marginTop: "10px" }}
            >
              
              일기추가
            </button>
          </div>

          <div
            style={{
              width: "455px",
              height: "100px",
              marginTop: "10px",
              border: "solid 2px red",
            }}
          >


            {/* 일기 리스트 출력 */}
            {/* 여기서 누른 날짜의 일기리스트를 제공 */}
            <div className="c">
              {selectedDate && listDiary
                .filter((diary) => diary.date === formatDate(selectedDate))
                .map((diary, index) => (
                  <button
                    key={index}
                    className="oval-button"
                    onClick={() => ClickDiary(index)}
                  >
                    <div className="b">
                      <p>{diary.title}</p>
                    </div>
                    <br />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽칸 */}
      <div className="diary-right-container">
        <div className="diary-page-inner">
          {/* 선택된 날짜 출력 */}
          {selectedDate && (
            <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
          )}

          {/* 일기 작성 폼 */}
          {isClick && (
            // CreateDiary 컴포넌트에 선택된 날짜 전달 (props로)
            // 예시: <CreateDiary selectedDate={selectedDate} />
            // 필요에 따라 선택된 날짜를 CreateDiary 컴포넌트로 전달해주세요.
            <CreateDiary selectedDate={selectedDate} onComplete={onComplete} date={selectedDate}  formatDate={formatDate}/>
          )}
        </div>
        
        {listClickVisible && selectedDiary && (
          <ViewDiary
            selectdate={selectedDiary}
          />
        )}
      </div>
    </div>
  );
};
export default Diarycopy;
