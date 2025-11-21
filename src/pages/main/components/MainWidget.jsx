import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const MainWidgetContainer = ({ className, bigText, smallText, link }) => {
  return (
    <div className={className}>
      <h2>{bigText}</h2>
      <p>{smallText}</p>
      <img src={link} alt="" />
    </div>
  );
};

export const MainWidget = styled(MainWidgetContainer)`
margin: 30px 0 30px 0;
position: relative;
width: 1350px;
height:650px;
background-color: transparent;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 30px;
box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;

 & img{
  width:100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
  
  
 }
  & h2 {
position: absolute;
  bottom: 90px;
  left: 50px;
  font-size: 70px;
  color:white;
  text-shadow: 0px 1px 10px rgba(0,0,0,0.6);
  
 }

 & p {
  position: absolute;
  bottom: 10px;
  left: 50px;
  font-size: 40px;
  color:white;
  text-shadow: 0px 1px 10px rgba(0,0,0,0.6);
 }

 @media (max-width: 1550px) {
  width: 1200px;
  height: 600px;
  & h2 {
    font-size: 50px;
  }
  & p {
    font-size: 30px;
 
`;

export const AnimateMainWidgetContainer = () => {
  const widgets = [
    <MainWidget
      bigText={"Элегантность каждый день"}
      smallText={"123123"}
      link={
        "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg"
      }
    />,
    <MainWidget
      bigText={"Коллекция для вдохновения"}
      smallText={"123123"}
      link={
        "https://images.pexels.com/photos/20238915/pexels-photo-20238915.jpeg"
      }
    />,
    <MainWidget
      bigText={"Стиль, который говорит за тебя"}
      smallText={"123123"}
      link={
        "https://images.pexels.com/photos/7610408/pexels-photo-7610408.jpeg"
      }
    />,
  ];

  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const totalPages = widgets.length;

  // Автопереключение каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const widgetVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.98,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        variants={widgetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {widgets[page]}
      </motion.div>
    </AnimatePresence>
  );
};

export const AnimateMainWidget = styled(AnimateMainWidgetContainer)`
  width: 100%;
`;
