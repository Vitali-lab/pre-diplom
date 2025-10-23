
import styled from "styled-components";

const ModalWindowContainer  = ( {className,children} ) => {

    return (
        <div className={className}>
            <div className="modal">
              {children}
            </div>
        </div>
    )
} 

export const ModalWindow = styled(ModalWindowContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    & .modal{
    width: 500px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    }
`