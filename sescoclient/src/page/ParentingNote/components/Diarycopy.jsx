import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import CreateDiary from './CreateDiary';
import './diary.css'

const Diarycopy = () => {
  //일기 추가 클릭했을 때 true로 되고 일기작성 폼 출력
  const [isClick, setIsClick] = useState(false)

  const [selectedDate, setSelectedDate] = useState(null);


  const [dtitle, setTitle] = useState(null);


  const [dcontent, setContent] = useState(null);

  //이미지 저장
  const [image, setImage] = useState("");

  //일기 추가 시 이벤트 처리
  const [events, setEvents] = useState([]);

  // 일기 리스트
  const [diaries, setDiaries] = useState([]);

  // --------------------------------------------------------------------------------------------------------------------------------------------------------

  function handleDateClick(info) {
    // 클릭한 날짜의 정보를 가져와서 처리합니다.
    setSelectedDate(info.date);
    //  setIsClick(true); // 일기 작성 폼 열기
  }


  function onComplete(title, content) {
    setTitle(title)
    console.log(dtitle);
    console.log(selectedDate.toLocaleDateString());

    if (selectedDate && title && content) {

      //const localDateString = ...: 선택된 날짜에서 현재 시스템의 타임존 오프셋을 빼서 UTC로부터 로컬 시간으로 변환하고, 그 결과를 'YYYY-MM-DD' 형식의 문자열로 만듭니다.
      const localDateString = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

      const newEvent = { title: title, date: localDateString };
      setEvents([...events, newEvent]);

      const newDiary = { date: localDateString, title: title, content: content };
      setDiaries([...diaries, newDiary]);
    }

    setIsClick(false);
    // setContent("");

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
            {diaries.map((diary) => (
              <div key={diary.date}>
                <p>{diary.title}</p>
                <p>{diary.content}</p>
              </div>
            ))}

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
      </div>
    </div>
  )
}
export default Diarycopy
