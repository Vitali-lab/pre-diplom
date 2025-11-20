import { NavLink } from "react-router-dom";
import styled from "styled-components";

const UlNavigate = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
width: 100%;

background-color: #ffffffff;
padding: 0;

& li{
    text-decoration: none;
    list-style: none;
    
    cursor: pointer;
    
    padding: 0px;
}
    & a{
        text-decoration: none;
        color: black;
        padding: 0px;
        font-weight: 500;
        font-size: 14px;
        
        
    }
`

const NavigateBarContainer = ({ className }) => {
    return (
        <div className={className}>
            <UlNavigate>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/'}>Главная</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/catalog'}>Каталог</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/about-us'}>О нас</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/delivery'}>Доставка</NavLink>
           </UlNavigate>
        </div>
    )
}

export const NavigateBar = styled(NavigateBarContainer)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 25px 0 0 0 ;
height: 40px;
width: 40%;
background-color: #ffffffff;
padding: 0;



& .active{
font-weight: 600;
color: var(--purple-color);
animation: active ease 0.5s;

& a {
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 14px;
  padding: 5px 0; 
  border-bottom: 0px solid #000;
}

& a.active {
  font-weight: 600;
  



}


`
