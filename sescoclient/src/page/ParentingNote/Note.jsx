import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import NoteList from './components/NoteList'
import noteBackground from './noteImg/noteBackground.png'
import noteFind from './noteImg/noteFind.png'
import './note.css';
import Diarycopy from './components/Diarycopy'
import { useNavigate } from 'react-router';
const Note = ({onTagClose}) => {

  const navigate = useNavigate();

  let user_nick

  const backToMain=()=>{
    navigate("/")
  }
  
  useEffect(() => {
    //회원정보가 있는지 확인하기
    //세션에서 회원정보 가져오기 ->null 오류처리 할것
    let user_id = sessionStorage.getItem("user_id")
    user_nick =sessionStorage.getItem("user_nick")

    if(user_id == null || user_nick == null){
       backToMain()
    }
  },[]);
  

  //세션에서 로그인한 유저 아이디/닉네임 정보가져오기
  const userId = sessionStorage.getItem("user_id");
  const userNick = sessionStorage.getItem("user_nick");

  //세션에 프로필에서 가져온 kidSeq값이 있는지 확인 
  const kidSeq = sessionStorage.getItem("kid_seq")

 



  ///-------------------------Note start---------------------//

  //수첩 목록 저장
  const [notes, setNotes] = useState([]);


  //선택한 수첩의 noteSeq값 저장
  const [selectedNoteSeq, setSelectedNoteSeq] = useState(null);

  //props로 다이어리컴포넌트에 넘겨줄 note정보
  const [noteData, setNoteData] = useState(null);



  //노트 클릭시
  const handleNoteClick = async (note_seq) => {
    setIsDiaryOpen(true);
    console.log('클릭한 노트의 note_seq:', note_seq);
    // 클릭 가능한 노트와 클릭 불가능한 노트를 구분
    const clickedNote = clickableNotes.find((note) => note.note_seq === note_seq);
    const lockedNote = lockedNotes.find((note) => note.note_seq === note_seq);
    console.log('클릭한 노트의 clickedNote:', clickedNote);
    if (clickedNote) {

      // 만약 이미 선택된 노트를 다시 클릭했다면
      if (selectedNoteSeq === note_seq) {
        setSelectedNoteSeq(null);
        setIsDiaryOpen(false);

      } else {
        try {
          // notes에서 선택한 note_seq 값과 일치하는 노트 찾기
          const selectedNote = notes.find((note) => note.note_seq === note_seq);

          // //현재 날짜
          // const todatDate = new Date();

          // //노트 n_s_date를 날짜 객체 변환
          // const noteStartDate = new Date(selectedNote.n_s_date);


          // 선택한 아이의 정보 찾기
          const selectedKid = kids.find((kid) => kid.kid_seq === kidSelect);

          if (selectedNote) {
            console.log('노트클릭시, note_seq, selectedNote:', note_seq, selectedNote);

            // 다이어리 컴포넌트에 전달할 객체 생성
            const noteData = {
              kidSeq: kidSelect,
              ...selectedNote,
              kids: kids,
              kidName: selectedKid ? selectedKid.kid_name : '',
              noteSeq: note_seq,
              tagSearchText: currentSearchTag,
              tagSearchResult: { tagResultNumbers },
              tagSearchResult: tagSearchResult[note_seq] || []
            };
            setNoteData(noteData);
            //setIsDiaryOpen(true);
            console.log("다이어리 컴포넌트에 전달하는 noteData : ", noteData)
          }
        } catch (error) {
          console.error('노트 상세 정보 가져오기 실패:', error);
        }

        setSelectedNoteSeq(note_seq);

      }
    } else {
      return;
    }

  }


  //---------Diary start-----------//

  // 일기 열었을때 닫기 버튼 클릭시
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const handleDiaryClose = () => {

    setSelectedNoteSeq(null);
    setIsDiaryOpen(false);

    console.log("일기 닫기 버튼 클릭 ")
  };

  //----------Diary end----------//

  

  ///-------------------------Note end ----------------------//



  ///-------------------------Kid start----------------------//

  //아이 정보
  const [kids, setKids] = useState([]);

  //// 사용자 아이 정보 불러오기
  useEffect(() => {
    const getKids = async () => {
      try {
        const response = await axios.post('http://172.30.1.56:8081/sesco/kid/getkidlist', { user_id: userId })
        setKids(response.data)
        console.log("사용자 아이 불러오기 성공", response.data)
        //첫 번째 아이 선택
        if (response.data.length > 0) {
          if(kidSeq){
            console.log("kidSeq있니 ",kidSeq)
            setKidSelect(kidSeq);
          }else{
            
          const firstKid = response.data[0];
          setKidSelect(firstKid.kid_seq);
          console.log("kidSeq없니 ",firstKid)
          }
        }

      } catch (e) {
        console.error("아이 정보 불러오기 실패", e)
      }
    }
    // 사용자 아이 정보 불러오기 함수 호출
    getKids();
  }, []);

  //옵션 선택한 아이 저장 
  const [kidSelect, setKidSelect] = useState(undefined)

  //<select> useRef
  const selectRef = useRef();

  const defaultSelect = () => {
    console.log("fwfwfwfwfwfwfw", kidSeq)
    kidSeq ? selectRef.current.value = kidSeq : selectRef.current.selectedIndex = 0
    const temp = selectRef.current.value
    if(!kidSeq){
    setKidSelect(temp)
    }
  }

  //로드시 세션에 저장된 kid_seq값이 있는 경우에는 해당 아이로 설정 없는 경우에는 처음에있는 아이로 설정
  useEffect(() => {
    defaultSelect()
  }, []);


  //선택된 아이 설정
  const handlekidSelectChange = (e) => {
    // setKidSelect(e.target.value);
    // console.log(e.target.value)
    const newKidSelect = e.target.value;

    setSelectedNoteSeq(null);
    setKidSelect(newKidSelect);
    console.log("선택된 아이 설정 : ", newKidSelect)

    //이후에 선택 시 그 아이의 수첩만 가져오게 하기
  }


  //선택한 아이의 노트 정보를 불러옴 (다시)

  // 클릭 가능한 노트와 클릭 불가능한 노트를 저장할 상태 변수
  const [clickableNotes, setClickableNotes] = useState([]);
  const [lockedNotes, setLockedNotes] = useState([]);

  useEffect(() => {
    const getNotesByKid = async () => {
      console.log("선택한 아이 : ", kidSelect)
      try {
        const reseponse = await axios.post('http://172.30.1.56:8081/sesco/note/createnotev2', { "kid_seq": kidSelect });

        //현재 연도,월  가져오기
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        // 각 노트의 n_s_date를 연도와 월로 분해하고 현재 연월과 비교하여 클릭 가능한 노트와 클릭 불가능한 노트로 구분
        const clickableNotes = [];
        const lockedNotes = [];

        reseponse.data.forEach((note) => {
          const noteYear = new Date(note.n_s_date).getFullYear();
          const noteMonth = new Date(note.n_s_date).getMonth() + 1;

          if (currentYear > noteYear || (currentYear === noteYear && currentMonth >= noteMonth)) {
            clickableNotes.push(note);
          } else {
            lockedNotes.push(note);
          }
        });

        setNotes(reseponse.data)
        setLockedNotes(lockedNotes);
        setClickableNotes(clickableNotes)
        console.log("노트 설정완료 : ", reseponse.data)
        console.log("클릭 가능한 노트 설정 : ", clickableNotes)
        console.log("클릭 !불가능한 노트 설정 : ", lockedNotes)
        //아이를 선택했을때 태그 검색 값 초기화 되도록 !
        setTagSearchResult({});
        setTagResultNumbers({});
        setCurrentSearchTag(null);
      } catch (e) {
        console.error("노트 불러오기 실패 : ", e);
      }
    }

    if (kidSelect) {
      getNotesByKid();
    }
  }, [kidSelect]);

  ///-------------------------Kid end -----------------------//



  ///-------------------------TAG start ---------------------//

  //태그 검색
  const [searchTag, setSearchTag] = useState("");
  // 태그 검색 결과를 저장할 상태 변수
  const [tagSearchResult, setTagSearchResult] = useState({});

  // 각 노트에 대한 태그 검색 결과 수를 계산하여 저장할 상태 변수
  const [tagResultNumbers, setTagResultNumbers] = useState({});

  const [currentSearchTag, setCurrentSearchTag] = useState(null);

  //태그 입력창 이벤트
  const handleSearchTagChange = (e) => {
    setSearchTag(e.target.value);

  };

  //태그 검색 버튼 눌렀을 때 이벤트
  const handleTagSearch = async () => {

    console.log("검색 결과는 : ", currentSearchTag)
    //태그 검색 후 다이어리가 열려있을때 다시 태그검색할 때 다이어리 닫음
    if (isDiaryOpen === true) {
      setSelectedNoteSeq(null);
      setIsDiaryOpen(false)
    }


    try {
      if (searchTag.trim() === "") return;
      console.log("사용자 아이디값  : ", userId)
      const response = await axios.get('http://172.30.1.56:8081/sesco/note/tagsearch', { params: { tag: searchTag, userId: userId } })
      setNotes(response.data)
      console.log("태그 검색 데이터 불러오기 : ", response.data)
      setTagSearchResult(response.data);

      // 응답 데이터를 기반으로 클릭 가능한 노트와 클릭 불가능한 노트를 업데이트
      const newClickableNotes = [];
      const newLockedNotes = [];
      response.data.forEach((note) => {
        // 여기에서 클릭 가능 여부를 판단하고, 클릭 가능한 노트와 클릭 불가능한 노트로 분류
        const isClickable = clickableNotes
        if (isClickable) {
          newClickableNotes.push(note);
        } else {
          newLockedNotes.push(note);
        }
      });
      // 클릭 가능한 노트와 클릭 불가능한 노트를 업데이트
      setClickableNotes(newClickableNotes);
      setLockedNotes(newLockedNotes);
      // 각 노트에 대한 태그 검색 결과 수 
      const newTagResultNumbers = {};

      response.data.forEach((note) => {
        const noteSeq = note.note_seq;
        if (!newTagResultNumbers[noteSeq]) {
          newTagResultNumbers[noteSeq] = 0;
        }
        newTagResultNumbers[noteSeq]++;
      });

      setTagResultNumbers(newTagResultNumbers);
      console.log("태그검색!!!!!!!!: ", newTagResultNumbers)

      //태그 검색 결과 객체 저장
      const newTagSearchResult = {};

      response.data.forEach((note) => {
        const noteSeq = note.note_seq;
        if (!newTagSearchResult[noteSeq]) {
          newTagSearchResult[noteSeq] = [];
        }
        newTagSearchResult[noteSeq].push(note); // 노트마다 검색 결과를 배열에 추가
      });
      setTagSearchResult(newTagSearchResult);
      console.log("태그검색! 결과!!!!!!!: ", newTagSearchResult);

      //태그 검색 버튼 결과가 없을 때 
      if (Object.keys(response.data).length === 0) {
        alert("태그 검색 결과가 없습니다.😥")
        
        //  아이의  수첩 다시 불러오기
        const reseponse = await axios.post('http://172.30.1.56:8081/sesco/note/createnotev2', { "kid_seq": kidSelect });
        setNotes(reseponse.data);


        console.log("태그 검색 결과 없을때 다시 수첩 : ", reseponse.data);

        // 클릭 가능한 노트와 클릭 불가능한 노트를 다시 판단

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const newClickableNotes = [];
        const newLockedNotes = [];

        reseponse.data.forEach((note) => {
          const noteYear = new Date(note.n_s_date).getFullYear();
          const noteMonth = new Date(note.n_s_date).getMonth() + 1;

          if (currentYear > noteYear || (currentYear === noteYear && currentMonth >= noteMonth)) {
            newClickableNotes.push(note);
          } else {
            newLockedNotes.push(note);
          }
        })
        setNotes(reseponse.data)
        setClickableNotes(newClickableNotes);
        setLockedNotes(newLockedNotes);
        console.log("태그 검색 결과 없을 때 클릭 or 클릭 불가 : ", newClickableNotes)


      }
      setSearchTag("")
      setCurrentSearchTag(searchTag);

    } catch (e) {
      console.error("태그 검색 실패 : ", e)
    }
    setSearchTag("")
  }

  // Enter 키 누를 때 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTagSearch();
      setSearchTag("")
    }
  }

  // 태그 검색 완료 후에 처리할 작업을 useEffect 내에서 실행
  useEffect(() => {
    console.log("태그 검색 완료 후11 : ", currentSearchTag);
    setCurrentSearchTag(currentSearchTag)

  }, [currentSearchTag]); // currentSearchTag 상태가 변경될 때마다 실행

  // 태그 검색 결과를 초기화하는 함수
  const handleTagClose = async() => {
    console.log("태그 취소 시 초기화 !  ", currentSearchTag)
    setCurrentSearchTag(''); // 상태 초기화
    setSelectedNoteSeq(null)
    setIsDiaryOpen(false)
    setSearchTag("")
    setTagSearchResult({})

     //  아이의  수첩 다시 불러오기
     const reseponse = await axios.post('http://172.30.1.56:8081/sesco/note/createnotev2', { "kid_seq": kidSelect });
     setNotes(reseponse.data);


     console.log("태그 검색 결과 초기화 수첩 : ", reseponse.data);

     // 클릭 가능한 노트와 클릭 불가능한 노트를 다시 판단

     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth() + 1;
     const newClickableNotes = [];
     const newLockedNotes = [];

     reseponse.data.forEach((note) => {
       const noteYear = new Date(note.n_s_date).getFullYear();
       const noteMonth = new Date(note.n_s_date).getMonth() + 1;

       if (currentYear > noteYear || (currentYear === noteYear && currentMonth >= noteMonth)) {
         newClickableNotes.push(note);
       } else {
         newLockedNotes.push(note);
       }
     })
     setNotes(reseponse.data)
     setClickableNotes(newClickableNotes);
     setLockedNotes(newLockedNotes);
     console.log("태그 검색 결과 없을 때 클릭 or 클릭 불가 : ", newClickableNotes)
   
    
  };


  ///-------------------------TAG end ---------------------//

  return (
    <div className='note-container'>
      <div className="book">
        <img className="noteBackground" src={noteBackground} />
        <div className="note-book-text">
          <span className="book-span">
            “ {userNick} ” 님의 <br />
          </span>
          <span className="book-span2">Book 캡슐 🧊 </span>
        </div>
      </div>

      {/* 태그 검색 div */}

      <div className='noteTagAndKid-container'>
        <div className='noteTagSearch-container'>
          <input
            className='noteTagFind2'
            type='search'
            placeholder='태그 검색'
            value={searchTag}
            onChange={handleSearchTagChange}
            onKeyDown={handleKeyPress} />
          <img src={noteFind} alt='tagSearch ' className='noteTagFindIcon' onClick={handleTagSearch} />
        </div>

        {/* 아이선택 div */}
        <div className='noteKidSelect'>
          {/* value 값은 현재 선택한 아이 kid_seq값으로 설정 */}
          <select ref={selectRef} className='note-myKidSelect' title="아이 선택" onChange={handlekidSelectChange} value={kidSelect}>
            {kids.map((kid) => (
              <option className='note-myKidSelectOption' value={kid.kid_seq} key={kid.kid_seq}>{kid.kid_name}</option>
            ))}
          </select>

        </div>
      </div>

      <div className='noteList'>
        <NoteList
          notes={notes.map(note => ({
            n_name: note.n_name,
            n_s_date: note.n_s_date,
            n_e_date: note.n_e_date,
            note_seq: note.note_seq,
          }))}
          onNoteClick={(note_seq) => handleNoteClick(note_seq)}
          kidSeq={kidSelect}
          kids={kids}
          tagSearchResults={tagResultNumbers}
          newTagSearchResult={tagSearchResult}
          isDiaryOpen={isDiaryOpen}
          tagSearchText={currentSearchTag}
          clickableNotes={clickableNotes}
          lockedNotes={lockedNotes}
          onTagClose={handleTagClose}
        />

        {/** 선택된 연도와 노트 있을 경우 다이어리 표시 */}
        {selectedNoteSeq && (
          <div className='diary-container active'>
            <Diarycopy noteData={noteData} />
            <button className='diary-close' onClick={() => handleDiaryClose()}>X</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Note