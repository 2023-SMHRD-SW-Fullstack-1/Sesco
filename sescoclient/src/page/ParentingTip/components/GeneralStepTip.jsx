import React, { useEffect, useState } from 'react'
import './gst.css'

const GeneralStepTip = () => {

const [isOpen, setIsOpen] = useState(false)


// const toggle = ()=>{
//     setIsOpen(!isOpen)
// }
  return (
    <div className='tip-general-container'>
        {/* 번호 */}
        <div className='tip-general-numbering'>
            01
        </div>

        {/* 토글부분 */}
        <button className='tip-general-content-head' onClick={()=>setIsOpen(!isOpen)}> </button>
        <div className={`tip-general-content-body ${isOpen ? 'open' : 'close'}`}>
          {isOpen &&  <text style={{"white-space" : "pre"}}> 
                SS에서 공백을 인식하는 속성은 white-space입니다. white-space 속성은 요소 내의 공백(스페이스, 탭, 줄바꿈) 처리 방법을 지정합니다.

                white-space 속성의 값으로는 다음과 같은 옵션이 있습니다

                🎆normal: 기본값으로, 연속된 공백을 하나로 처리하고 줄바꿈도 하나의 공백으로 처리합니다.
                🎆nowrap: 연속된 공백을 하나로 처리하지만 줄바꿈은 무시합니다.
                🎆pre: 연속된 공백과 줄바꿈을 유지합니다.
                🎆pre-wrap: 연속된 공백은 하나로 처리하고 줄바꿈은 유지합니다.
                🎆pre-line: 연속된 공백은 하나로 처리하고 줄바꿈은 일어납니다. (기본적인 텍스트 렌더링 규칙에 따름)
                🎆예를 들어, 아래 CSS 코드에서 .my-element 요소에 대해 white-space: pre-wrap; 속성을 사용하여 연속된 공백과 줄바꿈을 유지할 수 있습니다:
            </text>}

        </div>
    </div>
  )
}

export default GeneralStepTip