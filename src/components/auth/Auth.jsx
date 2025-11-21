import { Button, Input } from "..";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { auth } from "../../bff/api/back-end/auth";
import { notifySuccess, notifyError } from "../../func/notification";
import styled from "styled-components";
import { getUserToken } from "../../bff/api/back-end/get-user-token";

const AuthForm = styled.div`
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
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* лёгкая окантовка */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25); /* мягкая тень */
  background: rgba(255, 255, 255, 0.55);

  & .inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 30px 0 0 0;
  }
  & .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;
  }
`;

const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Введите e-mail")
    .email("Введите корректный e-mail")
    .max(50, "Email должен содержать максимум 50 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(/^[\w]+$/, "Пароль должен состоять только из букв и цифр")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(30, "Пароль должен содержать максимум 30 символов"),
});

const AuthContainer = ({ className, setIsAuthOpen, setIsRegistrationOpen }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(authFormSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await auth(email, password);
      if (user.error === null) {
        setIsAuthOpen(false);
        setError("");
        dispatch(getUserToken());
        notifySuccess(
          `Авторизация прошла успешно! Добро пожаловать ${user.user.name}!`,
        );
      } else {
        throw new Error(user.error);
      }
    } catch (err) {
      notifyError(err.message || "Ошибка авторизации");
    }
  };

  const formError = errors?.email?.message || errors?.password?.message;
  const errorMessage = formError || error;

  const portalRoot = document.getElementById("portal");
  if (!portalRoot) return null;

  return createPortal(
    <div
      className={className}
      onClick={(e) =>
        closeModal({ target: e.target }, setIsAuthOpen, false, ".auth")
      }
    >
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <AuthForm>
          <div className="title">
            <h3>Добро пожаловать в интернет магазин Holly</h3>
            <p>
              Впервые здесь?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegistrationOpen(true);
                  setIsAuthOpen(false);
                }}
              >
                Зарегистрируйтесь
              </button>
            </p>
          </div>

          <div className="inputs">
            <Input
              text="E-mail"
              width="600px"
              type="email"
              {...register("email")}
            />
            <Input
              text="Пароль"
              width="600px"
              type="password"
              {...register("password")}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>

          <div className="button">
            <Button type="submit" disabled={!!formError}>
              Войти
            </Button>
          </div>
        </AuthForm>
      </form>
    </div>,
    portalRoot,
  );
};
export const Auth = styled(AuthContainer)`
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
  animation: animation 0.3s ease-in-out;
  @keyframes animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & .error {
    color: red;
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
  }

  & .title {
    text-align: left;
  }

  & span {
    cursor: pointer;
  }
`;
