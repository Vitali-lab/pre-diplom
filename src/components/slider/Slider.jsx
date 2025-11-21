import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Loader from "../loader/Loader";
import { ProductCard } from "../product-card/ProductCard";

const ProductsSliderContainer = ({ className, products }) => {
  if (!products) {
    return <Loader />;
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    cssEase: "ease",
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  console.log(products);

  return (
    <div className={className}>
      {products.length >= 4 ? (
        <Slider {...settings}>
          {products.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </Slider>
      ) : (
        <div className="products">
          {products.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProductsSlider = styled(ProductsSliderContainer)`
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  & .slick-prev {
    left: -60px;
  }

  & .slick-next {
    right: -60px;
  }

  & .slick-slider {
    width: 1000px;
  }

  & .slick-list {
    overflow: hidden;
    margin: 0 auto;
  }

  & .slick-prev:before,
  & .slick-next:before {
    color: #000;
    font-size: 40px;
  }

  & .products-slide {
    max-width: 1450px;
    margin: 20px 0;
  }

  & .slick-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }

  & .products {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    margin: 20px 0;
  }

  & .slide {
    margin: 0 auto;
    max-width: 300px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    transition: transform 0.3s ease;

    & p {
      margin: 10px 0 0 0;
    }
  }

  & .slide img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
