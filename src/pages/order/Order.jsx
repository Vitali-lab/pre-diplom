import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Input } from "../../components";
import { postN8n } from "../../bff/api/back-end/post-n8n";
import { useNavigate } from "react-router-dom";
import { ModalWindow } from "../../components/modal-window/ModalWindow";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions/clear-cart";
import { postOrders } from "../../bff/api/post-orders";
import { updateProductSize } from "../../bff/api/patch-product-sizes";
import styled from "styled-components";
import { emptyCart } from "../../bff/api/back-end/clear-cart";
import { del, p } from "framer-motion/client";
import {
  ordersSelector,
  productsSelector,
  userSelector,
} from "../../selectors";

const OrderContainer = ({ className }) => {
  const { orderId } = useParams();
  const order = useSelector(ordersSelector);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [surname, setSurname] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(order);

  const currentUser = useSelector(userSelector);
  const products = useSelector(productsSelector);

  const onSubmit = () => {
    const complitedOrder = {
      orderNum: order.orderNum,
      userId: currentUser.id,
      userEmail: email,
      userPhone: phone,
      userName: name,
      userPatronymic: patronymic,
      userSurname: surname,
      status: "created",
      deliveryMethod: deliveryMethod,
      deliveryAddress: deliveryAddress,
      products: order.products,
    };
    postOrders(complitedOrder);
    postN8n(complitedOrder)
      .then(() => {
        setShowModal(true);
        setError("");
        updateProductSize(order.products);
        setTimeout(() => {
          navigate("/");
          dispatch(emptyCart(currentUser.id));
        }, 5000);
      })
      .catch((err) => {
        setShowModal(true);
        setError(err.message);
      });
  };

  return (
    <div className={className}>
      {showModal && (
        <ModalWindow
          text={error}
          onClose={() => {
            setShowModal(false);
          }}
        >
          {error ? <p>{error}</p> : <p>Заказ успешно отправлен</p>}
        </ModalWindow>
      )}
      <div className="complite-order">
        <h2> Заказ номер {orderId}</h2>
        <div>
          <p>Проверьте данные</p>
          <Input
            value={email}
            text={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            value={phone}
            text={"Телефон"}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            value={surname}
            text={"Фамилия"}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <Input
            value={name}
            text={"Имя"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            value={patronymic}
            text={"Отчество"}
            onChange={(e) => {
              setPatronymic(e.target.value);
            }}
          />
        </div>
        <h2>Доставка</h2>
        <div className="delivery">
          <div
            className={
              deliveryMethod === "Доставка по минску"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Доставка по минску");
            }}
          >
            <p>Доставка по Минску</p>
          </div>
          <div
            className={
              deliveryMethod === "Европочта"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Европочта");
            }}
          >
            <p>Европочта</p>
          </div>
          <div
            className={
              deliveryMethod === "Белпочта"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Белпочта");
            }}
          >
            <p>Белпочта</p>
          </div>
        </div>
        <div>
          {deliveryMethod === "Доставка по минску" && <p>Доставка по Минску</p>}
          {deliveryMethod === "Европочта" && <p>Доставка по Европочте</p>}
          {deliveryMethod === "Белпочта" && <p>Доставка по Белпочте</p>}
        </div>
        <div>
          <Input
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
            text={
              deliveryMethod === "Доставка по минску"
                ? "Адрес доставки"
                : "Адрес пункта выдачи"
            }
          />
        </div>
        <Button onClick={onSubmit} width="200px">
          Заказать
        </Button>
      </div>
    </div>
  );
};

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
`;
