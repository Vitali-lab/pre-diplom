
import { useState } from "react";
import { Auth } from "../auth/Auth";
import { Registration } from "../registration/Regictration";
import { NavigateBar } from "./components/navigate-bar/NavigateBar";
import { ControlPanel } from "./components/control-panel/ControlPanel";
import styled from "styled-components";


const HeaderContainer = ({ className  }) => {
    
const [isAuthOpen, setIsAuthOpen] = useState(false);
const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    return (
        <>
        {isAuthOpen && <Auth setIsAuthOpen={setIsAuthOpen} setIsRegistrationOpen={setIsRegistrationOpen}/>}
        {isRegistrationOpen && <Registration setIsRegistrationOpen={setIsRegistrationOpen}/>}
        <div className={className}>
        <ControlPanel setIsAuthOpen ={setIsAuthOpen}/>
        <NavigateBar/>
        </div>
         </>
    )

}


export const Header = styled(HeaderContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  padding: 12px clamp(16px, 3vw, 40px);
  gap: 12px;

  & .control-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: min(1280px, 100%);
    min-height: 64px;
    gap: 16px;
  }

  @media (max-width: 1200px) {
    & .control-panel {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 20px;

    & .control-panel {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }

  @media (max-width: 576px) {
    padding: 10px 16px;
    gap: 8px;
  }
`;