import React from 'react'
import * as mdb from 'mdb-ui-kit';
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { PiCaretDoubleRightBold } from "react-icons/pi";
import main2Img from '../../img/main2Img.png'
// import '~mdb-ui-kit/css/mdb.min.css';

const Banner2 = () => {
    return (
        <div id="carouselDarkVariant" className="carousel slide carousel-fade carousel-dark" data-mdb-ride="carousel">
            <div className="carousel-indicators">
                <button
                    data-mdb-target="#carouselDarkVariant"
                    data-mdb-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    data-mdb-target="#carouselDarkVariant"
                    data-mdb-slide-to="1"
                    aria-label="Slide 1"
                ></button>
                <button
                    data-mdb-target="#carouselDarkVariant"
                    data-mdb-slide-to="2"
                    aria-label="Slide 1"
                ></button>
                <button
                    data-mdb-target="#carouselDarkVariant"
                    data-mdb-slide-to="3"
                    aria-label="Slide 1"
                ></button>
                <button
                    data-mdb-target="#carouselDarkVariant"
                    data-mdb-slide-to="4"
                    aria-label="Slide 1"
                ></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={main2Img} className="d-block w-100" alt="Motorbike Smoke" />
                    <div className="carousel-caption d-none d-md-block">
                        <div className='Mbanner_info'>

                            <h1>소소한 육아 TIP </h1>
                            <br /><br />
                            <h2>0세~3세까지 : 뇌의 골격이 형성되는 시기</h2>
                            <br />
                            <h4>▷  스킨십 놀이를 해주세요</h4>
                            <br />
                            <p>피부는 제2의 뇌라고 할 만큼 뇌 발달과 직결되는 신결세포들이 많이 분포되어 있습니다. 아기를 안아주고, 기저귀를 갈아주고 하는 과정에서 아기와의 피부 접촉은 아이의 정서적 안정감을 가지고 옵니다.</p>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src={main2Img} className="d-block w-100" alt="Mountaintop" />

                    <div className="carousel-caption d-none d-md-block">
                        <div className='Mbanner_info'>
                            <h1>소소한 육아 TIP </h1>
                            <br /><br />
                            <h2>0세~3세까지 : 뇌의 골격이 형성되는 시기</h2>
                            <br />
                            <h4>▷  다양한 감각을 자극할 수 있는 놀이를 해주세요</h4>
                            <br />
                            <p>모든 뇌가 골고루 자극을 받고 만들어지기 위해서는 아이에게 촉각, 시각, 청각, 후각,미각 오감각을 자극해주는 놀이가 좋습니다. <br />한번의 자극으로 형성된 시냅스는 곧 사라져 없어시지 때문에 꾸준하고 지속적인 것이 좋습니다.</p>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src={main2Img} className="d-block w-100" alt="Woman Reading a Book" />
                    <div className="carousel-caption d-none d-md-block">
                        <div className='Mbanner_info'>

                            <h1>소소한 육아 TIP </h1>
                            <br /><br />
                            <h2>0세~3세까지 : 뇌의 골격이 형성되는 시기</h2>
                            <br />
                            <h4>▷  올바른 수면 습관을 만들어주세요</h4>
                            <br />
                            <p>갓 태어난 아기가 보고 듣고 느끼는 정보의 양은 많습니다. 사방에서 전해져 오는 모든 정보가 새로워서 반복적으로 탐색을 시도하는 것 자체가 에너지 소비를 많이 필요로 합니다. 그렇기 때문에 지친 아기들이 올바른 수면 습관을 통해 푹 자고 에너지를 보충해야 합니다. 수면을 통해 아기들은 바쁘게 움직였던 뇌세포가 쉬고 기억을 재정비하는 시간을 가지게 됩니다. 이런 과정에서 기억력이 강화되기 때문에 우리 아기가 잠을 잘 못 자고 보챈다면 그 원인을 찾아 숙면을 위해 도움을 주어야 합니다.</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={main2Img} className="d-block w-100" alt="Woman Reading a Book" />
                    <div className="carousel-caption d-none d-md-block">
                        <div className='Mbanner_info'>

                            <h1>소소한 육아 TIP </h1>
                            <br /><br />
                            <h2>3세~5세까지 : 종합적인 사고기능과 인성을 담당하는 전두엽이 발달하는 시기</h2>
                            <br />
                            <h4>▷  다양한 경험을 만들어주세요</h4>
                            <br />
                            <p>아이가 종합적이고 창의적인 생각을 하기 위해서는 많은 정보가 입력되어야 합니다. 아이가 직접적인 경험을 통해 많은 것을 배우고 느끼게 도와주세요. 이 시기에는 되도록 아이가 놀이를 통해 다양한 경험을 할 수 있도록 도와주는 것이 좋습니다.</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={main2Img} className="d-block w-100" alt="Woman Reading a Book" />
                    <div className="carousel-caption d-none d-md-block">
                        <div className='Mbanner_info'>

                            <h1>소소한 육아 TIP </h1>
                            <br /><br />
                            <h2>3세~5세까지 : 종합적인 사고기능과 인성을 담당하는 전두엽이 발달하는 시기</h2>
                            <br />
                            <h4>▷  사회성을 발달시킬 수 있도록 도와주세요</h4>
                            <br />
                            <p>아이들의 사회성이 자라는 시기이기 때문에 타인을 배려하고 양보하는 모습을 배워야 합니다. 이 시기에 타인의 감정을 이해하는 공감능력과 자신의 감정과 행동을 스스로 통제하는 자기조절 능력을 키워준다면, 사회적인 인격체로 성장시킬 수 있는 중요한 발판이 됩니다.</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselDarkVariant" data-mdb-slide="prev">
                    <span aria-hidden="true"><PiCaretDoubleLeftBold size='3em' /></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-mdb-target="#carouselDarkVariant" data-mdb-slide="next">
                    <span aria-hidden="true"><PiCaretDoubleRightBold size='3em' /></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    )
}

export default Banner2