import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../bff/api/get-user-orders";
import { useDispatch } from "react-redux";
import styled from "styled-components";


const UserCabinetContainer = ({className}) => {


    const currentUser = useSelector(state => state.user.currentUser);

   

    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(getUserOrders(currentUser.id))
    },[dispatch, currentUser.id])

    const userOrders = useSelector(state => state.app.userOrders);

   
    
    return(
        <div className={className}>
            <div>
                <h2>Здравствуйте {currentUser.name}!</h2>
            </div>
            <div>
                <h2>Ваши заказы</h2>
                {userOrders.map(item => {
                    return(
                        <div key={item.orderNum}>
                            <p>Заказ номер {item.orderNum}</p>
                            <p>Дата {item.date}</p>
                            <p>Статус {item.status}</p>
                            <p>Сумма {item.sum}</p>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const UserCabinet = styled(UserCabinetContainer)`

`