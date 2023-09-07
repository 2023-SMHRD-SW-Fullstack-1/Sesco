import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import CreateDiary from './CreateDiary';
import './diary.css'
import ViewDiary from './ViewDiary';

const Diarycopy = () => {
  //일기 추가 클릭했을 때 true로 되고 일기작성 폼 출력
  const [isClick, setIsClick] = useState(false);

  const [dClick, setdClick] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);


  const [dtitle, setTitle] = useState(null);


  const [dcontent, setContent] = useState(null);

  //이미지 저장
  const [image, setImage] = useState("");

  //일기 추가 시 이벤트 처리
  const [events, setEvents] = useState([]);

  // 일기 리스트
  const [diaries, setDiaries] = useState([]);

  const [ctitle, setcTitle] = useState("");
  const [idx,setIdx] = useState(0);

  


  // --------------------------------------------------------------------------------------------------------------------------------------------------------

  function handleDateClick(info) {
    // 클릭한 날짜의 정보를 가져와서 처리합니다.
    setSelectedDate(info.date);
    //  setIsClick(true); // 일기 작성 폼 열기
    console.log("handledateclick", selectedDate);

    //이게 2023-9-9 이렇게 바뀌고
    console.log("바꾸기",selectedDate?.toLocaleDateString());

    //diary안에 있는 값이 2023-09-09로 바뀌는데
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }


  
  function onComplete(title, content, imageFile) {
    setTitle(title)
    setContent(content)
    console.log(dtitle);
    console.log(selectedDate.toLocaleDateString());

    if (selectedDate && title && content) {

      //const localDateString = ...: 선택된 날짜에서 현재 시스템의 타임존 오프셋을 빼서 UTC로부터 로컬 시간으로 변환하고, 그 결과를 'YYYY-MM-DD' 형식의 문자열로 만듭니다.
      const localDateString = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

      const newEvent = { title: title, date: localDateString };
      setEvents([...events, newEvent]);

      const newDiary = { date: localDateString, title: title, content: content };
      setDiaries([...diaries, newDiary]);
      console.log("seletedDate",selectedDate);
      console.log("diarydate",diaries);
    }

    setIsClick(false);
    // setContent("");

  }

  function ClickDiary(index){
    console.log(index)
    setIdx(index)
    setdClick(!dClick)
    

  }



  function CreateDiaryForm() {
    setIsClick(!isClick)
  }


  return (
    // 수첩칸
    <div className='diary-whole-container'>
      <div className='diary-kids-tag'>
        <div className='diary-kid-name'>현민이</div>
      </div>


      {/* 왼쪽칸 */}
      <div className='diary-left-container'>
        <div className="diary-page-inner">
          <div className='diary-left-calendar'>


            <FullCalendar
              //풀캘린더 플러그인
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

              //클릭했을 때 날짜 가져오는 메서드
              dateClick={handleDateClick}

              //일기 작성했을 때 이벤트 추가
              events={events}
              initialView="dayGridMonth"
              headerToolbar={
                {
                  start: 'today',
                  center: 'title',
                  end: 'prev,next',
                }
              }
              //이건 뭔데
              eventDidMount={function (info) {
                var gColor = 'lightGreen';
                var bColor = 'lightBlue';
                if (info.event.extendedProps.status == 'done') {
                  info.el.style.backgroundColor = "red";
                } else if (info.event.extendedProps.status == '') {
                  info.el.style.backgroundColor = bColor;
                }
              }
              }
              eventDisplay={'block'}
              eventTextColor={'#FFF'}
              eventColor={'#F2921D'}
              height={'300px'}
            />
          </div>

          <div >

            <button onClick={CreateDiaryForm} style={{ width: "460px", height: "100px", marginTop: "10px" }} >일기추가</button>
          </div>
 
          <div style={{ width: "455px", height: "100px", marginTop: "10px", border: "solid 2px red" }}>

            {/* 일기 리스트 출력 */}
            
            <div className='c'>
            {diaries.filter(diary => diary.date === formatDate(selectedDate)).map((diary, index) => (
              <button key={index} className='oval-button' onClick={()=>ClickDiary(index)}>
                <div className="b">
                <p>{diary.title}</p><br />
                <p>{diary.content}</p>
                </div>
                <br />
              </button>
            ))}
            </div>
            
              
            
            
          

          </div>
        </div>
      </div>

      {/* 오른쪽칸 */}
      <div className='diary-right-container'>
        <div className='diary-page-inner'>
          {/* 선택된 날짜 출력 */}
          {selectedDate && (
            <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
          )}

          {/* 일기 작성 폼 */}
          {isClick && (
            // CreateDiary 컴포넌트에 선택된 날짜 전달 (props로)
            // 예시: <CreateDiary selectedDate={selectedDate} />
            // 필요에 따라 선택된 날짜를 CreateDiary 컴포넌트로 전달해주세요.
            <CreateDiary selectedDate={selectedDate} onComplete={onComplete} />
          )}
        </div>
        {dClick &&(
          <ViewDiary dtitle={dtitle} dcontent={dcontent} idx={idx}/>
        )}
      </div>
    </div>
  )
}
export default Diarycopy
