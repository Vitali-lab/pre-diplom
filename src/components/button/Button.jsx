
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
background-color: #fdfdfdff;
color: #181818ff;
font-size: 15px;
border: 1px solid #070707ff;
border-radius: 10px;
cursor: pointer;
transition: all ease 0.5s;
&:hover{
    transition: all ease 0.5s;
    background-color: #ecececff;
    color: #3f3f3fff;
    transform: scale(1.1);
    border: 0.5px solid #303030ff
}
    &:active{
        transition: all ease 0.5s;
        transform: scale(0.9);
    }
}

`