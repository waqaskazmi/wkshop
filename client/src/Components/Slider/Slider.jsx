import "./Slider.scss";
import { useState } from "react";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const data = [
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
    ];

    const nextSlide  = () => {
        console.log(currentSlide);
        setCurrentSlide( currentSlide === 3 ? 0 : currentSlide + 1);
        console.log(currentSlide);
    }

    const prevSlide  = () => {
        setCurrentSlide( currentSlide === 0 ? 3 : currentSlide - 1);
    }

    return ( 
        <div className="slider">
            <div className="container1" style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
                <img src={data[0]} alt=""/>
                <img src={data[1]} alt=""/>
                <img src={data[2]} alt=""/>
                <img src={data[3]} alt=""/>
            </div>
            <div className="icons">
                <div className="icon" onClick={prevSlide}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div className="icon" onClick={nextSlide}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
     );
}
 
export default Slider;