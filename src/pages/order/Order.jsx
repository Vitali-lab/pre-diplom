import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button , Input } from "../../components";
import { postN8n } from "../../bff/api/post-n8n";
import styled from "styled-components";

const OrderContainer = ({className}) => {

    const {orderId} = useParams();
    const order = useSelector(state => state.app.order);
    const [email , setEmail] = useState(order.user.email);
    const [name , setName] = useState(order.user.name);
    const [patronymic , setPatronymic] = useState(order.user.userPatronymic);
    const [surname , setSurname] = useState(order.user.userSurname);
    const [deliveryMethod , setDeliveryMethod] = useState('');
    const [deliveryAddress , setDeliveryAddress] = useState('');

    console.log(order);
    
    const onSubmit = () => {

        const complitedOrder = 
        {orderNum: order.orderNum,
         email,
         name, 
         patronymic, 
         surname, 
         deliveryMethod, 
         deliveryAddress,
         products: order.products
        }

        postN8n(complitedOrder);
    }

    return (
        <div className={className}>
        <div className="complite-order">
           <h2> Заказ номер {orderId}</h2>
           <div>
            <p>Проверьте данные</p>
            <Input value={email} text={'email'} onChange={(e) => {setEmail(e.target.value)}}/>
            <Input value={surname}  text={'Фамилия'} onChange={(e) => {setSurname(e.target.value)}}/>
            <Input value={name} text={'Имя'} onChange={(e) => {setName(e.target.value)}}/>
            <Input value={patronymic} text={'Отчество'} onChange={(e) => {setPatronymic(e.target.value)}}/>
           </div>
        <h2>Доставка</h2>
        <div className="delivery">
            <div className={deliveryMethod === 'Доставка по минску'? "delivery-item-active" : "delivery-item"}
            onClick={() => {setDeliveryMethod('Доставка по минску')}}>
                <p>Доставка по Минску</p>
            </div>
            <div className={deliveryMethod === 'Европочта'? "delivery-item-active" : "delivery-item"}
            onClick={() => {setDeliveryMethod('Европочта')}}>
                <p>Европочта</p>
            </div>
            <div className={deliveryMethod === 'Белпочта'? "delivery-item-active" : "delivery-item"}
            onClick={() => {setDeliveryMethod('Белпочта')}}>
                <p>Белпочта</p>
            </div>
        </div>
        <div>
            {deliveryMethod === 'Доставка по минску' && <p>Доставка по Минску</p>}
            {deliveryMethod === 'Европочта' && <p>Доставка по Европочте</p>}
            {deliveryMethod === 'Белпочта' && <p>Доставка по Белпочте</p> }
        </div>
        <div>
            <Input 
            onChange={(e) => {setDeliveryAddress(e.target.value)}}
            text={deliveryMethod === 'Доставка по минску' ? 'Адрес доставки' : 'Адрес пункта выдачи'}/>
        </div>
        <Button onClick={onSubmit} width = "200px">Заказать</Button>
        </div>
        
        </div>
    )
}

export const Order = styled(OrderContainer)`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: rgba(255, 255, 255, 0.14); 
backdrop-filter: blur(40px) saturate(180%);
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
& .complite-order{
    position: absolute;
    top: 10px;
    display: flex;
    width: 700px;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border : 1px solid #ccccccff;
    border-radius: 10px;
    padding: 20px;
}
    & .delivery{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    & .delivery-item{
        width: 180px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
    }
    & .delivery-item-active{
        width: 180px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        gap: 10px;
        border: 1px solid #ccccccff;
        box-shadow: 0 0 10px #ccccccff;
        border-radius: 10px;
        padding: 10px;
`