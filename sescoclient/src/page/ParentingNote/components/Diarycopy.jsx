import React from 'react'
import './diary.css'

const Diarycopy = () => {
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

            </div>
            <div>
                
            </div>
            <div>

            </div>
          </div>
        </div>

        {/* 오른쪽칸 */}
        <div className='diary-right-container'>
          <div className='diary-page-inner'>
            {/* 3가지폼 */}
          </div>
        </div>
    </div>
  )
}

export default Diarycopy




    // <div class="page-inner" contenteditable>
 