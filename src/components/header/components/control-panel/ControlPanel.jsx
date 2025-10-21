import { Link } from "react-router-dom";
import { Icon } from "../../../icon/Icon";
import { Logo } from "../../../logo/Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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


    const cart = useSelector(state => state.app.cart);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
  
  

    return(
        <div className={className}>
            <div className="search">
            <p> Поиск среди 2000 моделей </p>
            <Icon id="search" color="#050505ff" size="18"/>
            </div>
        <div className="logo">
            <Logo />
            </div> 
        <div className="icons">
            <Icon id="heart-o" color="#0a0a0aff" size="25" onClick={()=>{navigate('/favorites')}}/>
            <div className="shopping-bag">
                <Icon id="shopping-bag" size="25" color="#0c0c0cff" onClick={()=>{navigate('/cart')}}/>
                {cart.length > 0 && <span>{cart.length}</span>}
            </div>
            {!currentUser?(<Icon  id="user-o" color="#0c0c0cff" onClick={() => {setIsAuthOpen(true)}}/>)
            :(<div className="user-icon">{currentUser.name.slice(0,1)}</div>)}
             {currentUser && 
             <div>
                {currentUser.role === 'admin' && <Link to="/admin-panel"><Icon id="lock" color="#0c0c0cff"  size="25"/></Link>}
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
height: 70px;
margin: 0 auto;
& .user-icon{
width: 30px;
height: 30px;
border-radius: 50%;
background-color: #f5f5f5be;
color: #8a8888ff;
display: flex;
cursor: pointer;
border: 3px solid #494949ff;
justify-content: center;
align-items: center;
font-size: 22px;
font-weight: 700;
}
&  i {
cursor: pointer;
}

& .search{
width: 400px;
display: flex;
flex-direction: row;
justify-content: start;
gap: 10px;
align-items: center;
    
    & p{
        font-size: 15px;
        border-bottom: 1px dashed #050505ff;;
        color: #080808ff;
        margin: 0px;
    }
    &:hover{
        cursor: pointer;
    }
}
 & .icons{
     width: 400px;
     display: flex;
     flex-direction: row;
     justify-content: end;
     align-items: center;
     gap: 30px;
 } 
 & .logo{
   width: 400px;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   
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
         background-color: #ff0000ff;
         color: #ffffffff;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 12px;
         font-weight: bold;
     }
  }
`

