import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../bff/api/get-user-orders";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { correctDate } from "../../utils/correctDate";
import { userOrdersSelector, userSelector } from "../../selectors";

const UserCabinetContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);

  const ordersStatus = {
    created: "Создан",
    confirmed: "Подтвержден",
    delivery: "Доставка",
    completed: "Выполнен",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(currentUser.id));
  }, [dispatch, currentUser.id]);

  const userOrders = useSelector(userOrdersSelector);
  console.log("userOrders", userOrders);

  if (!currentUser) {
    return (
      <div className={className}>
        <h2>Войдите в аккаунт чтобы увидеть свои заказы</h2>
      </div>
    );
  }

  return (
    <div className={className}>
      <div>
        <h2>Здравствуйте {currentUser.name}!</h2>
      </div>
      {userOrders.length > 0 ? (
        <div>
          <h2>Ваши заказы</h2>
          {userOrders.map((item) => {
            return (
              <div key={item.orderNum} className="order">
                <p>Заказ номер: {item.orderNum}</p>
                <p>Дата: {correctDate(item.createdAt)}</p>
                <p>Статус: {ordersStatus[item.status]}</p>
                <p>Сумма: {item.sum}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>У вас нет заказов</h2>
        </div>
      )}
    </div>
  );
};

export const UserCabinet = styled(UserCabinetContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 20px;

  & .order {
    width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    border: 1px solid #ccccccff;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
    margin-bottom: 20px;
  }
`;
