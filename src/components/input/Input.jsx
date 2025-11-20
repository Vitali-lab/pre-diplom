import { useState } from "react";
import styled from "styled-components";

const InputContainer = ({ className, text, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = ({ target }) => {
    if (target.value === "") {
      setIsFocus(false);
    }
  };

  return (
    <div className={className}>
      <p className={`${!isFocus ? "title" : "title-up"}`}>{text}</p>
      <input {...props} onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
};

export const Input = styled(InputContainer)`
  & input {
    width: ${({ width = "300px" }) => width};
    height: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #070707ff;
    z-index: 10;
    color: #181818ff;
    font-size: 15px;
    padding: 10px;

    &:focus {
      outline: none;
    }
  }
  & .title {
    transform: translateY(25px);
    color: #000000ff;
    font-size: ${({ fontSize = "15px" }) => fontSize};
    z-index: 0;
    transition: all ease 0.3s;
    pointer-events: none;
  }
  & .title-up {
    transform: translateY(0px);
    color: #181818ff;
    font-size: ${({ fontSize = "15px" }) => fontSize};
    z-index: 0;
    transition: all ease 0.3s;
    pointer-events: none;
  }
`;
