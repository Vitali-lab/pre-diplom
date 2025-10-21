import { Icon } from "../../../components/icon/Icon";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../actions/remove-cart-item";
import { updateCartItemCount } from "../../../actions/update-cart-item-count";

import styled from "styled-components";

const CartItemContainer = ({className ,item ,cart}) => {
    const dispatch = useDispatch();

     const delItemCart = (id) => {
     dispatch(removeCartItem(id))
    }

     const addCount = (item) => {
        const size = item.size;
        if(item.count < item.sizes[size]){
             dispatch(updateCartItemCount(item.id, item.count + 1));
             
         }else {
            dispatch(updateCartItemCount(item.id, item.count = item.sizes[size]));
         } 
        
       
    }
    const delCount = (id ,item) => {
    const product = cart.find(item => item.id === id);
        if (item.count > 1) {
            dispatch(updateCartItemCount(product.id, product.count - 1));
        } else {
           dispatch(updateCartItemCount(product.id, product.count = 1));
        }
    }

    return (
        <div className={className}>
            <img src={item.images[0]} alt="" />
                    <p>{item.name}</p>
                    <p>Размер : {item.size}</p>
                    <p>Цена : {item.price} руб.</p>
                    <div className="count-menu">
                        <div className="count">
                        <button 
                        disabled={item.count === 1} 
                        onClick={()=>{delCount(item.id ,item)}}>-</button>
                        <p>{item.count}</p>
                        <button 
                        disabled={item.count === item.sizes[item.size]} 
                        onClick={()=>{addCount(item)}}>+</button>
                        </div>
                         <div className="count-info">
                           <p>В наличии : {item.sizes[item.size]}</p>
                         </div>
                        
                    </div>
                   <button onClick={()=>{delItemCart(item.id)}}>X</button>
        </div>
    )
}
 
export const CartItem = styled(CartItemContainer)`
position: relative;
display: flex;
width: 900px;
flex-direction: row;
justify-content: space-between;
align-items: center;
border: 1px solid #cecbcbff;
border-radius: 10px;
padding: 20px;
gap: 10px;
& img{
    width: 90px;
}
& .count{
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
gap: 10px;}

& .count-info{
font-style: italic;
font-size: 12px;
line-height: 18px;
color: #000000ff;
 & p {
    margin: 0;
 }
}
`