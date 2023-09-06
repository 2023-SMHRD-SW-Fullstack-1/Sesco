import React from 'react'
import'./styles.scss'
import TipQnA from './TipQnA'
import Banner from './components/Banner'


const Main = () => {
  return (
    <>
      <Banner/>
    <div className='tip-content-container'>
      <TipQnA/>
    </div>
    </>
  )
}

export default Main