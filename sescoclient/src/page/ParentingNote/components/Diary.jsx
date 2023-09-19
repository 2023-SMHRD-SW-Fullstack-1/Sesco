

// const Diarycopy = ({noteData}) => {





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




//   return (
//     <></>
//   );
// };
// export default Diarycopy;

import React from 'react'

const Diary = () => {
  return (
    <div>Diary</div>
  )
}

export default Diary