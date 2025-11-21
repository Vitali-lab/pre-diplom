

import styled from "styled-components";

 const Loader = () => {
  return (
    <StyledWrapper>
      <div className="bulb">
       </div>
        <p>Загрузка</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: transparent;
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: 10px;
  .bulb {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 10px solid var(--purple-color);
    border-bottom: 10px solid transparent;
    background-color: transparent;
   
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }`;

export default Loader