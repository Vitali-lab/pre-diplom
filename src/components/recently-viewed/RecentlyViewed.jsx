import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const RecentlyViewedContainer = ({className}) => {

    let views = [];

    if(sessionStorage.getItem('products')){
        views = JSON.parse(sessionStorage.getItem('products'));
    }
     
    const settings = {
  dots: false,            // ❌ убираем точки снизу
  arrows: false,          // ❌ убираем стрелки
  infinite: true,         // ✅ бесконечная прокрутка
  autoplay: true,         // ✅ запускается сам
  autoplaySpeed: 0,       // ⏱️ интервал между прокрутками (0 = непрерывно)
  speed: 18000,            // 🐢 медленная прокрутка
  cssEase: "linear",      // ⚙️ равномерная скорость
  slidesToShow: 4,
  slidesToScroll: 1,
  pauseOnHover: true,    // ❌ не останавливается при наведении
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};
  
   

    return (
        <div className={className}>
            <h1>Недавно просмотренные</h1>
            <div className="products">
             {views.length === 0 ? <p>Вы ничего не просматривали</p> 
             :(<Slider {...settings}>
                 {views.map((item) => {
                return(
                <div key={item.id} className="slide">
                <img src={item.images[0]} alt={item.name} />
                <p>{item.name}</p>
                </div>)
                })}
             </Slider>) }
            </div>
        </div>
    )
}

export const RecentlyViewed = styled(RecentlyViewedContainer)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
width: 1600px;
background-color: #ffffffff;
margin: 50px 0 0 0;
border-top: 1px solid #ccccccff;
border-bottom: 1px solid #ccccccff;


& .products{
max-width: 1655px;
margin: 20px 0 0 0;

}
& .slide {
  width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
}
& .slide img {
  width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
`