import { NavLink } from "react-router-dom";
import styled from "styled-components";

const UlNavigate = styled.ul`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
width: 100%;
gap: 20px;
background-color: #ffffffff;

& li{
    text-decoration: none;
    list-style: none;
    font-size: 20px;
    cursor: pointer;
    font-size: 18px;
}
    & a{
        text-decoration: none;
        color: black;
        padding: 0px;
        
    }
`

const NavigateBarContainer = ({ className }) => {
    return (
        <div className={className}>
            <UlNavigate>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/'}><li>Главная</li></NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/catalog'}><li>Каталог</li></NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/about-us'}><li>О нас</li></NavLink>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={'/delivery'}><li>Доставка</li></NavLink>
           </UlNavigate>
        </div>
    )
}

export const NavigateBar = styled(NavigateBarContainer)`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin: 20px 0;
width: 40%;
background-color: #ffffffff;

& .active{

font-weight: 600;
color: #000000ff;
}

`
