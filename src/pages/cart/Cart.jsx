import { Button } from "../../components/button/Button";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/create-order";
import { postN8n } from "../../bff/api/post-n8n";
import { CartItem } from "./components/CartItem";



const CartContainer = ({className}) => {

    const cart = useSelector(state => state.app.cart);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const postInServer = (cart) => {
    const orderNum = new Date().getTime();
    const post = cart.reduce((acc, item)=>{
        acc.push({
            id:item.id,
            name:item.name,
            size:item.size,
            price:item.price,
            count:item.count,
            

        })
        return acc;
    },[])

    dispatch(createOrder(orderNum, currentUser, post));
     navigate(`/cart/order/${orderNum}`)    
    }
 
    
   

   
    

    return(
        <div className={className}>
        <h2>Корзина</h2>
        {currentUser? <div className="cart">
            <div className="cart-list">
           {cart.length === 0? (<p>Корзина пуста</p>) : cart.map((item) => {
            return(
                <CartItem key={`${item.id}-${item.size}`} item={item} cart={cart}/>
            )
           })} 
        </div>
        {cart.length > 0 &&  
        <div>
           <div className="cart-info">
            <p>Итого: {cart.reduce((acc, item) => acc + Number(item.count) * Number(item.price), 0)} руб.</p>
        </div>
         <div>
             
            <Button onClick={()=>{postInServer(cart)}} width="200px">Оформить заказ</Button>
        </div>
        </div>}

        </div> : <p>Вы не авторизованы</p>}
        
        


        
        </div>
    )
}

export const Cart = styled(CartContainer)`
width: 100%;
text-align: left;
width: 1600px;
margin: 0 auto;
margin: 40px 0;

& .count{
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
gap: 10px;}

& .cart{
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: start;
gap: 20px;
}


& .cart-info{
width: 500px;
padding: 20px;
border-radius: 10px;



}

& .cart-list{
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
gap: 20px;
margin: 30px 0;
}

   
` 