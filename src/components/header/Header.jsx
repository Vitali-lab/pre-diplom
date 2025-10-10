
import styled from "styled-components";
import { useState } from "react";
import { Auth } from "../../pages/auth/Auth";
import { NavigateBar } from "./components/navigate-bar/NavigateBar";
import { ControlPanel } from "./components/control-panel/ControlPanel";


const HeaderContainer = ({ className  }) => {
    
const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
        {isAuthOpen && <Auth setIsAuthOpen={setIsAuthOpen}/>}
       
        <div className={className}>
        
         <ControlPanel setIsAuthOpen ={setIsAuthOpen}/>
        
       
           <NavigateBar/>
        </div>
         </>
    )

}


export const Header = styled(HeaderContainer)`  
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width: 1400px;
background-color: #ffffffff;
width: 1700px;
position: fixed;
z-index: 1;
top: 0;

& .control-panel{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    margin: 0 auto;
}


}

        
`