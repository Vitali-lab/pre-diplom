import { Link } from "react-router-dom";
import { Icon } from "../../../icon/Icon";
import { Logo } from "../../../logo/Logo";
import styled from "styled-components";

const ControlPanelContainer = ({className , setIsAuthOpen}) => {

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
            <Icon id="heart-o" color="#0a0a0aff"/>
            <Icon id="shopping-bag" color="#0c0c0cff"/>
            <Icon id="user-o" color="#0c0c0cff" onClick={() => {setIsAuthOpen(true)}}/>
             <Link to="/admin-panel"><Icon id="lock" color="#0c0c0cff"/></Link>          
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
`

