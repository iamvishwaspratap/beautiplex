import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage from "../assets/Slider1.jpg"
import sliderImage2 from "../assets/Slider2.jpeg"
 import sliderImage3 from "../assets/Slider3.jpg"
import sliderImage4 from "../assets/Slider4.jpeg"

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="hero-slider">
      <div>
        <img src={sliderImage} alt="Salon 1" className="img-fluid rounded" />
      </div>
      <div>
        <img src={sliderImage2} alt="Salon 2" className="img-fluid rounded" />
      </div>
      <div>
        <img src={sliderImage3} alt="Salon 3" className="img-fluid rounded" style={{ width: "100%", height: "400px", objectFit: "cover" }}/>
      </div>
      <div>
        <img src={sliderImage4} alt="Salon 3" className="img-fluid rounded" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      </div>
    </Slider>
  );
};

export default ImageSlider;
