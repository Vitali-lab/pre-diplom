
import styled from "styled-components";


 const IconContainer = ({className , id , onClick}) => (
   
    <div className={className} onClick={onClick}>
        <i className={`fa fa-${id}`}></i>
    </div>
    
)

export const Icon = styled(IconContainer)`
font-size: ${({size = '25'}) => size}px;
margin: ${({margin = '0'}) => margin};
color: ${({color = '#161616ff',disabled}) => disabled ? '#cc11c' : color}};
text-align: center;
transition: color 0.2s ease-in-out;
cursor: pointer;
  &:hover {
    color:${({hoverColor = '#111111ff'}) => hoverColor};
  }
`