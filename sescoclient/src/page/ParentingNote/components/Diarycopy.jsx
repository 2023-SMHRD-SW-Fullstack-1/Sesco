import React from 'react'
import './diary.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDiary from './CreateDiary';

const Diarycopy = () => {
  const navigate = useNavigate();

  const [isClick, setIsClick] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [dtitle, setTitle] = useState(null);
  const [dcontent, setContent] = useState(null);
  const [image, setImage] = useState("");

  function handleDateClick(info) {
    // 클릭한 날짜의 정보를 가져와서 처리합니다.
    const clickedDate = info.date;
    setSelectedDate(clickedDate);
    console.log('Selected date:', clickedDate);
  }

  function onComplete(title, content) { 
    setTitle(title)
    setContent(content)
		console.log('전달된 제목:', title);
		console.log('전달된 내용:', content);
		// ... Diarycopy 컴포넌트에서 받은 데이터 처리 로직 추가
	}


  // function handleComplete(title, content) { 
  //   setTitle=this.title
  //   setContent=this.content
  // setTitle(title)
	// 	console.log('전달된 제목:', title);
	// 	console.log('전달된 내용:', content);
	// 	// ... Diarycopy 컴포넌트에서 받은 데이터 처리 로직 추가
	// }
  


  function CreateDiaryForm (){ 
    setIsClick(!isClick)
    console.log(isClick);
    
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
            plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
            events={[
              { title: 'event 1', date: '2023-09-04' },
              { title: 'event 1', date: '2023-09-05' }

            ]}
            initialView="dayGridMonth"
              headerToolbar={
                {
                  start: 'today',
                  center: 'title',
                  end: 'prev,next',
                }
              }
              eventDidMount={function(info) {				
                var gColor = 'lightGreen';
                var bColor = 'lightBlue';
                if (info.event.extendedProps.status == 'done') {
                  info.el.style.backgroundColor = "red";
                } else if(info.event.extendedProps.status == '') {
                  info.el.style.backgroundColor = bColor;
                }		
              }
              }
            eventDisplay={'block'}
            eventTextColor={'#FFF'}
            eventColor={'#F2921D'}
            height={'300px'}
            dateClick={handleDateClick} // DateClick
            
            
            
            
            
            
          />
          </div>

          <div >
            
            <button onClick={CreateDiaryForm} style={{width : "460px", height : "100px", marginTop : "10px"}} >일기추가</button>
          </div>

          <div style={{width : "455px", height : "100px", marginTop : "10px", border : "solid 2px red"}}>
            <p>{dtitle}</p>
            <p>{dcontent}</p>

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
            <CreateDiary selectedDate={selectedDate} onComplete={onComplete}/>
          )}
        
        </div>




      </div>
    </div>
  )
}

export default Diarycopy





    // <div class="page-inner" contenteditable>
