import logo from '../../images/logo.png'
import styled from "styled-components";


 const LogoContainer = ({ className }) => 

    <div className={className}>
        <img src={logo} alt="" />
    </div>




export const Logo = styled(LogoContainer)`
font-size: 30px;
color: #070707ff;
margin:${({margin = '0 0 0 50px'}) => margin};
display: flex;
margin: 0 auto;
cursor: pointer;
width: 100px;

& img {
    
    width: 100px;
    height: 50px;
}
& h1 {
    margin: 0px;
}
    
`