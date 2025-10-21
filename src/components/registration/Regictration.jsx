import { Input } from "../input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../button/Button";
import {  useState } from "react";
import { postUser } from "../../bff/api/post-user";
import styled from "styled-components";



const registrationFormSchema = yup.object().shape({
    email: 
    yup.string()
    .required("Введите e-mail")
    .email("Введите корректный e-mail")
    .max(50, "Email должен содержать максимум 50 символов"),
    name:
    yup.string()
    .required("Введите имя")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(30, "Имя должно содержать максимум 30 символов"),
    surname:
    yup.string()
    .required("Введите фамилию")
    .min(2, "Фамилия должна содержать минимум 2 символа")
    .max(30, "Фамилия должна содержать максимум 30 символов"),
    patronymic:
    yup.string()
    .required("Введите отчество")
    .min(2, "Отчество должно содержать минимум 2 символа")
    .max(30, "Отчество должно содержать максимум 30 символов"),
    password: 
    yup.string()
    .required("Введите пароль")
    .matches(/^[\w]+$/, "Пароль должен состоять только из букв и цифр")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(30, "Пароль должен содержать максимум 30 символов"),
    passcheck: 
    yup.string()
    .required("Введите пароль повторно")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")

});





const RegistrationContainer = ({className ,setIsRegistrationOpen}) => {


   
    const closeModal = ({target}) => {
        const registration = document.querySelector('.registration')
        const isClickInside = registration.contains(target);
        if (!isClickInside) {
            setIsRegistrationOpen(false);
        }
    }


     const { 
            register, 
            reset,
            handleSubmit, 
            formState: {errors},} = useForm({ 
            defaultValues: {
                email: "",
                name: "",
                surname: "",
                patronymic: "",
                password: "",
                passcheck: "",
            } ,
            resolver: yupResolver(registrationFormSchema),
        });



    const [error , setError] = useState('');



    const onSubmit = async({name,surname,patronymic,email,password,passcheck}) => {
         try {
          const regOk = await postUser( name,surname,patronymic,email,password,passcheck )
          
          if(regOk){
          setIsRegistrationOpen(false);
          setError('');
          } 
        } catch (err) {
          setError(err.message || 'Ошибка авторизации');
        }
    }

     const formError = errors?.email?.message || errors?.password?.message||errors?.name?.message||errors?.surname?.message||errors?.patronymic?.message||errors?.passcheck?.message
    const errorMessage =  formError || error; 
    
    return(
        <div className={className} onClick={closeModal}>
            
            <form className="registration"  onSubmit={handleSubmit(onSubmit)}>
                <h2>Регистрация</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
               <div className="about-user">
                 <Input text={'Ваше имя'} 
                fontSize={'17px'}
                {...register("name",{
                onChange: () => setError(null) 
            })} />
                <Input text={'Ваша фамилия'}
                fontSize={'17px'}
                {...register("surname", {
                    onChange: () => setError(null)})}  />
                <Input text={'Ваше отчество'}
                fontSize={'17px'}
                {...register("patronymic",{
                    onChange: () => setError(null)
                })}  />
               </div>
               <div className="email-password-block">
                 <Input text={'Ваша почта'} 
                type={'email'}
                fontSize={'17px'}
                {...register("email",{
                    onChange: () => setError(null)
                })} />
                <Input text={'Ваш пароль'}  
                type={'password'}
                fontSize={'17px'}
                {...register("password",{
                    onChange: () => setError(null)
                })}  />
                <Input text={'Повторите пароль'}  
                type={'password'}
                fontSize={'17px'}
                {...register("passcheck",{
                    onChange: () => setError(null)               })}/>
               </div>
                <Button width = "200px">Зарегистрироваться</Button>
            </form>
            
        </div>
    )
}

export const Registration = styled(RegistrationContainer)`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: rgba(255, 255, 255, 0.2); /* полупрозрачный слой */
backdrop-filter: blur(40px) saturate(180%);
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;


& .email-password-block{
    display: flex;
    flex-direction: row;
    gap: 40px;
    }

& .about-user{
display: flex;
flex-direction: row;
gap: 40px;
}

& .title{
     text-align: left;
     
    
}

& .error{
    color: red;
    padding: 10px;
    border : 1px solid red;
    border-radius: 5px;
}
 & .registration{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 0px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    border-radius: 20px;  border: 1px solid rgba(255, 255, 255, 0.3); /* лёгкая окантовка */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25); /* мягкая тень */
    background: rgba(255, 255, 255, 0.55);
    
 }
`

//    background: rgba(255, 255, 255, 0.2); /* полупрозрачный слой */
//   backdrop-filter: blur(15px) saturate(180%); /* размытие и насыщенность */
//   -webkit-backdrop-filter: blur(15px) saturate(180%); /* для Safari */
//   border-radius: 20px;
//   border: 1px solid rgba(255, 255, 255, 0.3); /* лёгкая окантовка */
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25); /* мягкая тень */
  
//   color: #fff;
//   background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05));