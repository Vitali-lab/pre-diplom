
import styled from 'styled-components';

const ButtonContainer = ({ className, children, onClick }) => {
  return (
    <div className={className}>
      <button className='button' onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export const Button = styled(ButtonContainer)`

& .button {
width:${({width = '100px'}) => width};
height: 45px;
background-color: var(--purple-color);
color: #ffffffff;
font-size: 15px;
border:none;
border-radius: 10px;
cursor: pointer;
transition: all ease 0.5s;
&:hover{
    transition: all ease 0.5s;
    box-shadow: 0px 0px 10px 5px rgba(251, 251, 251, 0.94);
    
}
    &:active{
        transition: all ease 0.5s;
        transform: scale(0.9);
    }
}

`