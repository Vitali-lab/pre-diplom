import { Button ,Input } from "../../components";
import styled from "styled-components";

const AuthForm = styled.div`
width: 800px;
height: 400px;
background-color: #ffffff;
margin: 0 auto;
padding: 30px;
border-radius: 10px;

& .inputs{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 30px 0 0 0;
    
    
}
 & .button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;
}   
`

const AuthContainer = ({ className, setIsAuthOpen }) => {

    const closeModal = ({target}) => {
        const auth = document.querySelector('.auth')
        const isClickInside = auth.contains(target);
        if (!isClickInside) {
            setIsAuthOpen(false);
        }
    }

    return (
        <div className={className} onClick={closeModal}>
            <div className="auth">
                <AuthForm >
                 <div className="title">
                <h3>Добро пожаловать в интернет магазин Holly</h3>
                <p>Впервые здесь? <a href="">Зарегистрируйтесь</a></p>
                </div>   
                <div className="inputs">
                <Input text={"Логин"} width="600px"/>
                <Input text={"Пароль"} width="600px" type="password"  />
                </div>
                <div className="button">
                    <Button>Войти</Button>
                </div>
            </AuthForm>
            </div>
        </div>
    );
};

export const Auth = styled(AuthContainer)`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: #2b2b2be1;
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
& .title{
     text-align: left;
     
    
}

`