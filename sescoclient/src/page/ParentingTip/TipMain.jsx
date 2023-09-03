import React from 'react'
import './tip.css'
import TipAccordion from './components/TipAccordion'
import TipItem from './components/TipItem'

const TipMain = () => {

  const titleList = [1,2,3,4,5]
  const contentList = ['a',`b
  검색
  
  
  인기 검색어
  둔촌동 맛집
  tistory
  토비의스프링3
  블로그 꾸미기
  소라게 키우기
  토비
  한체대 맛집
  천호동 맛집
  소라게 키우는 방법
  직장인재테크
  티스토리 꾸미기
  티스토리 글쓰기
  티스토리
  웹개발 취업
  웹개발 스터디
  천호동 존맛
  뷰티 소라게
  재테크
  성내동 맛집
  tistory 꾸미기
  갓대희의 작은공간
  갓대희's 작은공간
  Light
  Dark
  Menu
  1. 자격증
  SQLD 준비
  2. 웹개발
  개발 주저리
  웹개발 기본
  Error모음
  AWS
  환경설정 & etc
  JAVA
  스프링
  스프링부트
  스프링부트_ETC
  Javascript
  Javascript Function 모음
  React
  3. Database
  쿼리_Func_Proc
  Error모음
  Oracle 기본
  Mysql
  4.Linux
  5. 개발도구
  IntelliJ
  피들러(Fiddler)
  GIT
  잘쓰면 업무에 유용한 도구
  Docker
  Jenkins
  6. DevOps
  N
  
  AWS
  N
  
  7. 개인 관심
  맛집
  블로그 관련 지식
  쇼핑몰 관련 지식
  금융상식
  일상
  생활 꿀팁 & 이용후기
  소라게 키우기
  맥북 사용기
  인테리어
  99. 프로필
  홈
  태그
  미디어로그
  방명록
  카테고리
  Social Channels
  RSS 피드
  로그인
  2. 웹개발/React
  [React] 4. React 컴포넌트(5) - map() 반복문, 배열 컴포넌트
     14
  
  4. React 컴포넌트(5) - map() 반복문, 배열 컴포넌트 사용하기
   
  
  안녕하세요. 갓대희 입니다. 이번 포스팅은 [ React 반복문 사용하기 ] 입니다. : ) 
  
   
  
  
  https://ko.reactjs.org/docs/lists-and-keys.html
  
   
  
  
   
  
  0. 들어가기 앞서
   - 어떨때 map 함수를 쓰면 좋을까?
  
  앞으로 알아가겠지만 for문, 반복문을 대체하여 사용한다면 아주 유용하다.
  
  간단히 형태 살펴보고 자세히 알아보도록 하자.
  
   
  
  ex) for문
  
  
  const numbers = [1, 3, 5]
  for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i])
  }
  
  ex) map()
  
  
  const numbers = [1, 3, 5];
  const listItems = numbers.map((number, idx) => {
      console.log(number);
  });
  
   
  
   - 앞으로 알아가겠지만 맵으로는 for문보다 더 좋은 장점들, 편리한 기능들을 제공한다.
  
  1. map()함수란?
   - 반복되는 컴포넌트를 렌더링하기 위하여 자바스크립트 배열의 내장 함수인 map()을 사용 한다.
   - 파라미터로 전달된 함수를 사용하여 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 새로운 배열 생성 한다.
     (위의 예제에서 새로운 배열을 반환하는 것을 보았을 것이다.)
  
   
  
  2. 문법
   - arr.map(callbackFunction, [thisArg])
   - arr.map(callbackFunction(currenValue, index, array), thisArg)
  
   
  
   1) callbackFunction : 새로운 배열의 요소를 생성하는 함수로서 다음 세가지 인수를 갖는다.
      ㆍcurrenVlaue : 현재 배열(arr) 내의 값들을 의미
      ㆍindex : 현재 배열 내 값의 인덱스를 의미
      ㆍarray : 현재 배열
   2) thisArg(선택항목) : callback 함부 내부에서 사용할 this 레퍼런스 를 설정한다.
  
   
  
  ex) map()함수를 통해 각 배열의 요소에 +1 하여 새로운 배열로 생성하는 예제
  
  
  const numbers = [1, 3, 5];
  const listItems = numbers.map(function(number){
      console.log(number);
    return number + 1;
  });
  
  console.log(listItems);
  
   
  
  ex) es6 문법 사용시
  
  
  const numbers = [1, 3, 5];
  const listItems = numbers.map((number, idx) => {
      console.log(number);
    return number + 1;
  });
  
  console.log(listItems);
  
   
  
  3. Component 배열로 map 적용하기
   - map()을 사용하여 Component를 나타내어 보자.
  
   
  
  ex) Main
  
  
  import React from 'react';
  
  const Main = (props) => {
      return (
          <div>
        <h3>안녕하세요. {props.name} 입니다.</h3>
          </div>
      );
  };
  
  export default Main;
   
  
   - Main 컴포넌트를 Map()를 사용하여 반복하여 사용해보자.
  
  ex) App
  
  
  import React from 'react';
  import Main from './Main';
  
  const App = () => {
    const names = ["갓대희", "김대희", "한대희"]
    const nameList = names.map((name) => (<Main name={name}/>))
    return (
      <div>
        {nameList}
      </div>
    );
  }
  
  export default App;
  
   
  
   - 2차원 배열로도 응용 가능하다.
  
  ex) App => 1차원 배열에 나이를 추가하여 2차원 배열로 표현해보자.
  
  
  import React from 'react';
  import Main from './Main';
  
  const App = () => {
    const names = [
      ["갓대희", 19], 
      ["김대희", 29],
      ["한대희", 39]
    ]
    const nameList = names.map((v) => (<Main name={v[0]} age={v[1]}/>))
    return (
      <div>
        {nameList}
      </div>
    );
  }
  ex) Main
  
  
  import React from 'react';
  
  const Main = (props) => {
      return (
          <div>
        <h3>안녕하세요. {props.name}({props.age}) 입니다.</h3>
          </div>
      );
  };
  
  export default Main;
  
   
  
  ex) App => 2차원 배열을 객체로 표현할 수도 있다. 결과는 위의 예시와 동일.
  
  
  import React from 'react';
  const App = () => {
    const names = [
      {userName : "갓대희", age : 19}, 
      {userName : "김대희", age : 29},
      {userName : "한대희", age : 39}
    ]
    const nameList = names.map((v) => (<Main name={v.userName} age={v.age}/>))
    return (
      <div>
        {nameList}
      </div>
    );
  }
   
  
  ex) App => Filter 함수를 응용하여 30이하의 유저만 표현할 수도 있다.
  
      ( Filter 처리되어 30세 미만인 경우의 user만 노출 된다.)
  
  
  import React from 'react';
  import Main from './Main';
  
  const App = () => {
    const names = [
      {userName : "갓대희", age : 19}, 
      {userName : "김대희", age : 29},
      {userName : "한대희", age : 39}
    ]
    let nameList = names.filter(v => v.age < 30);
    nameList = nameList.map(v => (<Main name={v.userName} age={v.age}/>));
    return (
      <div>
        {nameList}
      </div>
    );
  }
  
  4. key 설정하기
   - 위의 예제대로만 작성한 경우 다음과 같은 오류 메세지를 볼 수 있다. 
  
   ( Each child in a list should have a unique "key" prop."
  
  
   - 결론적으로 key를 생성하라는 건데 key는 무었일까?
  
  
   - 사용목적 : 요소의 리스트를 만들 떄, React에서 컴포넌트를 렌더링 하였을때 어떤 아이템이 변경되었는지 빠르게 감지하기 위해 사용 한다.(변경, 추가, 삭제 등)
     만약 key가 설정되지 않았다면 가상 DOM을 순차적으로 비교하면서 감지하기 때문에 key가 없을때보다 속도가 느리다.
   
   - map 함수 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하는 것과 같이 작성 한다.
   - key는 요소의 고유한 값이어야 한다. 배열 요소의 고유한 값을 사용하거나 index로 사용한다.
     (단, index는 배열의 순서가 바뀌면 index도 바뀌기 때문에 권장하지 않는다.)
  
   
  
  ex) App
  
  
  import React from 'react';
  import Main from './Main';
  
  const App = () => {
    const names = [
      {userName : "갓대희", age : 19}, 
      {userName : "김대희", age : 29},
      {userName : "한대희", age : 39}
    ]
    const nameList = names.map(v => (<Main key={v.userName} name={v.userName} age={v.age}/>));
    return (
      <div>
        {nameList}
      </div>
    );
  }
  
  export default App;
   - 경고가 사라진 것을 볼 수 있다.
  
   
  
  5. 더미데이터 사용하기
   - 물론 이 배열을 더미데이터, json을 활용하여 Map() 함수를 사용해보자.
   - DB 폴더를 생성하여, data.json 파일을 생성하고 다음과 같은 내용을 입력해 보자.
  
  ex) data.json
  
  
  {
      "users" : [
          {"userName" : "갓대희", "age" : 19}, 
          {"userName" : "김대희", "age" : 29},
          {"userName" : "한대희", "age" : 39}
      ]
  }
   
  
  
  
  ex) App 컴포넌트는 다음과 같이 정리 하도록 한다.
  
  
  import React from 'react';
  import Main from './Main';
  
  const App = () => {
    return (
      <div>
        <Main />
      </div>
    );
  }
   
  
  ex) Main 컴포넌트에서 db를 사용해보자.
  
  
  import React from 'react';
  import dummy from "../db/data.json";
  
  const Main = (props) => {
      return (
          <div>
        {dummy.users.map(user => (
          <h3 key={user.userName}>안녕하세요. {user.userName}({user.age}) 입니다.</h3>
        ))}
          </div>
      );
  };
  
   
  
   - 간단하게 map()을 활용하여 반복문, 컴포넌트를 표현하는 방법들을 알아보았다.
  
  
  좋아요14
  공유하기게시글 관리구독하기
  저작자표시 비영리 변경금지
  TAG
  react dummy, React map, react map함수, react 반복문, react 컴포넌트 반복, 리액트 map, 리액트 더미, 리액트 반복문
  당신이 좋아할만한 콘텐츠
  [React] 7. React hooks[2] - useEffect란?
  2022.03.06
  [React] 6. React Router (리액트 라우터) 사용하기
  2022.02.02
  [React] 4. React 컴포넌트(4) - 이벤트 처리 방법
  2022.02.01
  [React] 4. React 컴포넌트(3) - State 알아보기(React Hooks 사용)
  2022.01.14
  NEXT
  
  [React] 4. React 컴포넌트(4) - 이벤트 처리 방법
  PREV
  
  [React] 6. React Router (리액트 라우터) 사용하기
  댓글 0
  이름
  비밀번호
  댓글을 입력해주세요.
   비공개 댓글 남기기
  
  Copyright ⓒ 2019 TriplexLab. All Rights Reserved.
  
  
  
  TOP
  
  관리메뉴열기갓대희의 작은공간구독하기
  `,'c','d','e']

  return (
    <>
      <div className='tip-title-img'> 
       <h4 className='tip-title-text'>"USER" 님을 위한 <br /> 육아 Tip </h4>
      </div>
      <div className='tip-content-container'>
        {/* 아바타 공간 */}
        <div className='tip-content-avatar'>
      
        </div>

        {/* 팁공간 */}
        <div className='tip-content-general-tip'>
          <TipAccordion titleList={titleList} contentList={contentList}></TipAccordion>
        </div>
      </div>
    
    </>
  )
}

export default TipMain