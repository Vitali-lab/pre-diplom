

import { useEffect, useLayoutEffect,useState } from "react";
import { getProduct } from "../../bff/api/get-product";
import { useParams } from "react-router-dom";
import { Icon } from "../../components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../../actions/add-in-cart";
import { notifySuccess , notifyError } from "../../func/notification";
import { useToggleFavorites } from "../../hooks/use-toggle-favorites";
import styled,{keyframes} from "styled-components";
import { Button } from "../../components/button/Button";
import { Sizes } from "../../components/sizes/Sizes";

const openAnimation = keyframes`
from{
    
    opacity: 0;
    transform: translateY(-30px);
}
to{
    opacity: 1;
    transform: translateY(0px);
}
`

const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 10px;
    margin: 50px 0 0 0;
    animation: ${openAnimation} 0.5s ease;
`;

const AboutCurrentSizeDiv = styled.div`
font-size: 10px;
margin: 0px;
width: 100%;
animation: ${openAnimation} 0.5s ease;
 & p{
 font-size: 15px;
 margin: 20px 0 0 0px;
 }


`


const ProductContainer = ({className}) => {

    const params = useParams();

    const [product, setProduct] = useState({});
    const [activeButton, setActiveButton] = useState('');
    const [increment, setIncrement] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [hover , setHover] = useState(null);
    const {toggleFavorites,isUserLike} = useToggleFavorites();
    
    const nextImage = () => {
        if(increment < product.images.length - 1) {
            setIncrement(increment + 1);
        }else {
            setIncrement(0);
        }
    }  
    
    const prevImage = () => {
        if(increment > 0) {
            setIncrement(increment - 1);
        }else {
            setIncrement(product.images.length - 1);
        }
    }


    useEffect(()=>{
        setTimeout(()=>{
          setUserRating(0)  
        },30000)
    },[userRating])
   

    const dispatch = useDispatch();

    useLayoutEffect(()=>{
    getProduct(params.id)
    .then((data)=>setProduct(data))
    },[])

  const cart = useSelector(state => state.app.cart);
    
  cart.find(item => console.log(item))

  

    if(Object.keys(product).length === 0) {
          
        return <h1>Loading...</h1>;}
    
     const sizesKeys = Object.keys(product.sizes);   
     
    
    const addToCard = () => {

        if(!activeButton) {
            notifyError("Выберите размер");
            return;
        }

        if (activeButton && !cart.find(item => item.id === `${product.id}-${activeButton}` && item.size === activeButton) ) {
           dispatch(addInCart(product, `${product.id}-${activeButton}`, activeButton,1));
           notifySuccess(`${product.name} размера ${activeButton} добавлен в корзину`);
        } else {
            notifyError(`${product.name} размера ${activeButton} уже есть в корзине`);
        }
       
       
    }
   
    


    return (
       
         <div className={className}>
            <div className="images">
                {product.images.length > 1 && <Icon id={"chevron-left"} onClick={prevImage}/>}
                 <div className="image">
                    <img src={product.images[increment]} alt="" />
                 </div>
                {product.images.length > 1 &&  <Icon id={"chevron-right"} onClick={nextImage}/>}
            </div>
            
             <div className="information">
                <h1>{product.name}</h1>
                <h5>{product.description}</h5>
                <p>{product.price} руб.</p>
             <Sizes sizesKeys={sizesKeys} product={product} activeButton={activeButton} setActiveButton={setActiveButton}/>
             {activeButton && 
                <AboutCurrentSizeDiv className="about-current-size">
                    <p>Выбран размер: {activeButton}</p>
                    <p>В наличии: {product.sizes[activeButton]} шт.</p>
                </AboutCurrentSizeDiv>}
             <ButtonsDiv >
                <Button disabled={!activeButton} width="400px" onClick={addToCard}>{activeButton ? `Добавить в корзину: ${product.name } размер: ${activeButton}` : 'Выберите размер'}</Button>
                <Button width="400px" onClick={()=>{toggleFavorites(product)}}>{isUserLike(product) ? 'Убрать из избранного' : 'Добавить в избранное'}</Button>
             </ButtonsDiv>

             <div className="rating">
                {Array(5).fill(0).map((item, index) => {
                    return (
                        <Icon id={"star"} key={index}
                        size = {'35'} 
                        color={index + 1 <= (hover || userRating) ? '#fdcc2cff' : 'grey'} 
                        onMouseEnter={() => setHover(index + 1)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setUserRating(index + 1)}/>
                    )   
                })}
             </div>
             {userRating === 0 ? <p>Оцените товар</p> : (
                <div>
                    <p>Ваша оценка: {userRating}</p>
                    <Button>Отправить</Button>
                </div>
             )}
             
             <p>Общий рейтинг: {product.rating}</p>
             
             </div>
         </div>
        
    )
}

export const Product = styled(ProductContainer)`
width: 1600px;
padding: 40px;
display: flex;
flex-direction: row;
justify-content: space-around;
gap: 117px;

& .rating{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin: 50px 0 0 0;
    transition: all ease 0.5s;

    & i{
        cursor: pointer;
        transition: all ease 0.5s;
        &:hover{
            transition: all ease 0.5s;
            color: #fdcc2cff;
        }
    }
}





& .information{
width: 30%;
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
 
 & h5{
 font-size: 15px;
 font-weight: 400;
 margin: 0px 0 20px 0;
 }
}
& .images {
width:70%;
height: 800px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 30px;
margin: 0 0 20px 0;
transition: all ease 0.5s;
& i:hover{
    cursor: pointer;
    color: #7c7c7cff;
    transition: all ease 0.5s;
}
    & i:active{
    transform: scale(0.8);
    color: #7c7c7cff;
    
  
}
& .image img {
  width: 550px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24);
  object-fit: contain;
  
  
  
  
}
    
`