import React from 'react'

const ViewDiary = ({dtitle,dcontent,idx}) => {
  console.log(dtitle);
  console.log(dcontent);


  return (
    <div>
    {dtitle}
    {dcontent}
    </div>
  )
}

export default ViewDiary