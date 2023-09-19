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


const Diarycopy = ({noteData}) => {
  //noteData에는 kid_seq, note_seq, kid_name... 노트 객체 전달받음


  // -------------------------fullcalendar start-------------------------------------//

  //선택한 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜마다 바뀐 일기 리스트 저장
  const [selectedDiaryList, setSelectedDiaryList] = useState()


  //날짜변경 시 일기를 해당 날짜 기준으로 필터링
  useEffect(()=>{

    const tempDiaryList = listDiary.filter((diary)=> diary.date == formatDate(selectedDate))
    setSelectedDiaryList(tempDiaryList)  

    setListClickVisible(true);

  },[selectedDate])

  
  //날짜 맞춰주는 함수 : 2023-09-09
  function formatDate(date) {
    console.log(date);
    return moment(date).format('YYYY-MM-DD');
  }
  
  // -------------------------------fullcalendar End ---------------------------------//


  // --------------------tag start------------------//

  
  //검색한 태그 일기장
  const [searchedTag, setSearchedTag] = useState(null);

  // 태그 검색 시 필터링
  useEffect(() => {
    // noteData.tagSearchText와 일치하는 요소만 포함하는 새로운 배열을 생성
    const filteredDiary = listDiary.filter((diary) => {
      // 이 부분에서 태그 검색을 어떻게 처리할지에 따라 로직을 수정해야 할 수도 있습니다.
      // 현재 코드는 diary.tags가 noteData.tagSearchText와 일치해야 필터링됩니다.
      return diary.tags === noteData.tagSearchText;
    });
  
    // 필터링된 배열을 setSelectedDiaryList로 설정
    setSelectedDiaryList(filteredDiary);
    setListClickVisible(true);
  }, [noteData.tagSearchText]);




  // --------------------tag   end------------------//



  // --------------------------------------일기 start-----------------------------------//

  
  // 전체 일기 리스트 관리
  const [listDiary, setListDiary] = useState([]);

  // 일기 리스트 초기화
  useEffect(() => {
    fetchDiaryList();
  }, []);

  
  //일기 작성화면으로 전환 
  const [isClick, setIsClick] = useState(false);
  
  
  //일기View 페이지로 전환
  const [listClickVisible, setListClickVisible] = useState(false);

  function CreateDiaryForm() {
    setIsClick(!isClick);
  }

  
  //DB에 저장된 일기 리스트 불러오기
  const fetchDiaryList = () => {
    axios.post(`http://localhost:8081/sesco/diary/selectlist`, {
      note_seq : noteData.noteSeq
    })
      .then((res) => {
        const fetchedEvents = res.data.diary.map((event, idx) => {
          return {
            d_seq: event.d_seq,
            title: event.d_title,
            date: event.d_date,
            content: event.d_content,
            tags: event.d_tags,
            img: event.img_real_name,
            note_seq : noteData.noteSeq
          }
        });
        setListDiary(fetchedEvents);
        console.log("노트에서 불러옴", noteData);
      })
      .catch((err) => {
        console.log("리스트 오류", err);
      });
    }

    //일기 작성 완료 처리 함수
    function onComplete(title, content,tags) {
      
    if (selectedDate && title && content) {

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
                
            </div>
            
          </div>
        </div>
      </div>

      {/* 오른쪽칸 */}
      <div className="diary-right-container">
        <div className="diary-page-inner">
          {/* 선택된 날짜 출력 */}
          {selectedDate && (
            <p>선택된 날짜: </p>
          )}

          {/* 일기 작성 폼 */}
          {isClick && (
            // CreateDiary 컴포넌트에 선택된 날짜 전달 (props로)
            // 예시: <CreateDiary selectedDate={selectedDate} />
            // 필요에 따라 선택된 날짜를 CreateDiary 컴포넌트로 전달해주세요.
            <CreateDiary selectedDate={selectedDate} onComplete={onComplete} date={selectedDate}  formatDate={formatDate} noteData={noteData}/>
          )}
        </div>
        
        {listClickVisible && selectedDiaryList && selectedDiaryList.length > 0 && (
  <ViewDiary
    selectdate={selectedDiaryList}
  />  
)}

      </div>
    </div>
  )
}

export default Diarycopy