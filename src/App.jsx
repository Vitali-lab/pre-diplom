import { Header } from "./components";
import { Footer } from "./components";
import { useLayoutEffect } from "react";
import { getCategories } from "./bff/api/back-end/get-categories";
import { getSeasons } from "./bff/api/back-end/get-seasons";
import { useDispatch } from "react-redux";
import { getProducts } from "./bff/api/back-end/get-products";
import { ToastContainer } from "react-toastify";
import { getUserToken } from "./bff/api/back-end/get-user-token";
import { AppRouter } from "./components/router/AppRouter";
import styled from "styled-components";

const AppContainer = ({ className }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getUserToken());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSeasons());

    if (!sessionStorage.getItem("products")) {
      sessionStorage.setItem("products", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <div className={className}>
        <ToastContainer />
        <Header />
        <AppRouter />
      </div>
      <Footer
        links={[
          { href: "/catalog", label: "Каталог" },
          { href: "/about-us", label: "О нас" },
          { href: "/contacts", label: "Контакты" },
        ]}
        contacts={[
          "Телефон: +375 29 123-45-67",
          "Email: info@holly.by",
          "Адрес: Минск, ул. Ленина, 10",
        ]}
        copy="© 2019 - 2025 Holly-Minsk. Все права защищены."
      />
    </>
  );
};

export const App = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: min(1280px, 92%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: #ffffffff;
  margin-top: 200px;
  margin-bottom: 100px;

  border-radius: 16px;
  box-shadow: 0px 12px 40px rgba(15, 23, 42, 0.08);

  @media (max-width: 1200px) {
    width: min(1100px, 96%);
  }

  @media (max-width: 992px) {
    padding: 24px;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    margin-top: 120px;
    padding: 16px;
    min-height: auto;
    box-shadow: none;
  }

  @media (max-width: 576px) {
    margin-top: 100px;
    padding: 12px;
  }
`;
