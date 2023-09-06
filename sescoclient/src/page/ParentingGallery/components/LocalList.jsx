import React from "react";
import Slider from "react-slick";

const LocalList = () => {

    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return (
    <div>
        <Slider {...settings}>
          <div>
            dooo
          </div>
          <div>
            dwjowqfw
          </div>
        </Slider>
    </div>
  )
}

export default LocalList

