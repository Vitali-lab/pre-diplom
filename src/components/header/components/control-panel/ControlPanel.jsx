import { Link } from "react-router-dom";
import { Icon , Logo , Search } from "../../../../components";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../bff/api/back-end/logout";
import { notifySuccess } from "../../../../func/notification";
import { currentUserSelector } from "../../../../selectors/current-user-selector";
import styled,{keyframes} from "styled-components";

const bagAnimation = keyframes`
0%{
    
    transform: rotate(0deg);
}
25%{
    transform: rotate(10deg);
}
50%{
    transform: rotate(0deg);
}
75%{
    transform: rotate(-10deg);
}
100%{
    transform: rotate(0deg);
}
`



const ControlPanelContainer = ({className , setIsAuthOpen}) => {

    const currentUser = useSelector(currentUserSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  

  const userLogout =  () => {
    dispatch(logout());
    navigate('/');
    notifySuccess('Вы успешно вышли из аккаунта');
  }
  

    return(
        <div className={className}>
        <div className="search">
            <Search/>
        </div>    
        <div className="logo">
            <Logo width = "250px" height = "100px" />
            </div> 
        <div className="icons">
            <Icon id="heart-o" color="#0a0a0aff" size="25" onClick={()=>{navigate('/favorites')}}/>
            <div className="shopping-bag">
                <Icon id="shopping-bag" size="25" color="#0c0c0cff" onClick={()=>{navigate('/cart')}}/>
                {(currentUser?.cart||[]).length > 0 && <span>{currentUser.cart.length}</span>}
            </div>
            {!currentUser?(<Icon  id="user-o" color="#0c0c0cff" onClick={() => {setIsAuthOpen(true)}}/>)
            :(<div className="user-icon" onClick = {() => {navigate(`/user-cabinet/${currentUser.id}`)}}>{currentUser?.name.slice(0,1)}</div>)}
            {currentUser && <Icon id="sign-out" color="#0c0c0cff" size="27" onClick={userLogout}/>}
             {currentUser && 
             <div>
                {currentUser.role === 0 && <Link to="/admin-panel"><Icon id="lock" color="#0c0c0cff"  size="25"/></Link>}
            </div>  

             }       
            </div>
        </div>
    )

}

export const ControlPanel = styled(ControlPanelContainer)`

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
width: 100%;
height: 80px;
margin: 0 auto;

& .user-icon{
width: 20px;
height: 20px;
border-radius: 50%;
background-color: #f5f5f5be;
color: #8a8888ff;
display: flex;
cursor: pointer;
border: 3px solid #494949ff;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: 700;
}
&  i {
cursor: pointer;
}

& .search{
width: 32%;
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px;
align-items: center;
    
    & p{
        font-size: 15px;
        color: #080808ff;
        margin: 0px;
    }
    &:hover{
        cursor: pointer;
    }
}
 & .icons{
     width: 32%;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     gap: 30px;
 } 
 & .logo{
   width: 32%;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   position: relative;
   top: 20px;
   left: -20px;
   
 }  
   
  & .shopping-bag {
  cursor: pointer;
     position: relative;
     animation: ${bagAnimation} 1s ease ;
     & span{
         position: absolute;
         top: -9px;
    right: -16px;
    width: 22px;
    height: 22px;
         border-radius: 50%;
         background-color: var(--purple-color);
         color: #ffffffff;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 12px;
         font-weight: bold;
     }
  }

  @ media (max-width: 1800px) {
    width: 100%;
    font-size: 12px;
    & .search{
        width: 100%;
    }
    & .icons{
        width: 100%;
    }
    & .logo{
        width: 100%;
    }
  }
`

