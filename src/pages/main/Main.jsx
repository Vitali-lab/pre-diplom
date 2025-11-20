import styled from "styled-components";
import { RecentlyViewed } from "../../components/recently-viewed/RecentlyViewed";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateMainWidget, MainWidget } from "./components/MainWidget";
import { ProductsWiget } from "./components/ProductsWiget";
import { img } from "framer-motion/client";
import { CollectionWidget } from "./components/CollectionWidget";

const MainContainer = ({ className }) => {
  const products = useSelector((state) => state.products.products);
  const seasons = useSelector((state) => state.products.seasons);
  const categories = useSelector((state) => state.products.categories);

  console.log(seasons);

  return (
    <div className={className}>
      <AnimateMainWidget />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1>Коллекции</h1>
        <CollectionWidget />
      </div>

      <MainWidget
        link={
          "https://images.pexels.com/photos/15759241/pexels-photo-15759241.jpeg"
        }
        bigText={"Winter is coming..."}
        smallText={"Хватит мерзнуть! Утепляйся с нашей новой коллекцией"}
      />

      <div>
        <h1>Популярные товары</h1>
        <ProductsWiget />
      </div>

      <RecentlyViewed />
    </div>
  );
};

export const Main = styled(MainContainer)`
width: 100%;
padding: 10px;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 30px;
margin: 0 auto;

 & h1 {
   text-align: center;
   font-size: 40px;
 }



& .presentation {
margin-top: 60px;
position: relative;
width: 100%;
height: 200px;
background-color: transparent;
border-radius: 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
 & img{
   width: 100%;
  height: 900px;
  border-radius: 30px;
  
 }
  & h2 {
position: absolute;
  bottom: 40px;
  left: 50px;
  font-size: 90px;
  color:white;
  text-shadow: 0px 1px 10px rgba(0,0,0,0.6);
 }

}

& .bolck{
width: 100%;
height: 700px;
background-color: transparent;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: start;

& .new-producrs{
position: relative;
width: 58%;
height: 600px;
background-color: transparent;
border-radius: 30px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
 & h2 {
 position: absolute;
 bottom: 10px;
 left: 50px;
 font-size: 40px;
 }
 & img{
  width: 100%;
  height: 600px;
  border-radius: 30px;
  object-fit: cover;
  
  
}
}


@ media (max-width: 1800px) {
  & .new-producrs{
    width: 100%;
  }
  & .collections{
    width: 100%;
    height: 400px;
  }
}
@ media (max-width: 1000px) {
  & .new-producrs{
    width: 100%;
  }
  & .collections{
    width: 100%;
    height: 400px;
  }
}


`;
