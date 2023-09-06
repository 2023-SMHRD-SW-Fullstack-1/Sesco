import React, { useState } from 'react';
import AccordionItem from './components/AccordionItem';
import test from '../../img/galleyMap.png'

const TipQnA = () => {

    const testData = {
        "age": [
            {
                "id": 1,
                "ageT": "0~3개월",
                "context": "0~3개월 tip 내용"
            },
            {
                "id": 2,
                "ageT": "4~8개월",
                "context": "4~8개월 tip 내용"
            },
            {
                "id": 3,
                "ageT": "8~12개월",
                "context": "8~12개월 tip 내용"
            },
            {
                "id": 4,
                "ageT": "1~2살",
                "context": "1~2살 tip 내용"
            },
            {
                "id": 5,
                "ageT": "3~4살",
                "context": "3~4살 tip 내용"
            },
            {
                "id": 6,
                "ageT": "5~6살",
                "context": "5~6살 tip 내용"
            },
            {
                "id": 7,
                "ageT": "7살",
                "context": "7살tip 내용 "
            }
        ]
    }


    return (
        <div className='tip'>

            {/* 아바타 공간 */}
            <div className='imgContainer'>
                <img className='tipImg' src={test} />
            </div>

            {/* 팁공간 */}
            <div className="tipContainer">
                <h2>Tip</h2>
                <div className="accordion">
                    {testData.age.map((list, index) => <AccordionItem key={index} index={index} list={list} />)}
                </div>
            </div>

        </div>
    )
}

export default TipQnA