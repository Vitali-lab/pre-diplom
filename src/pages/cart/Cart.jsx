import { Button } from "../../components/button/Button";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/create-order";
import { CartItem } from "./components/CartItem";
import { useEffect, useMemo } from "react";
import Loader from "../../components/loader/Loader";
import { scrollTop } from "../../utils/scrollTop";
import { productsSelector, userSelector } from "../../selectors";

const CartContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(productsSelector);

  useEffect(() => {
    scrollTop();
  }, []);

  const cartAndProduct = useMemo(() => {
    if (!currentUser || !products || products.length === 0) return [];
    return (currentUser.cart || []).map((item) => {
      const product = products.find((product) => product.id === item.productId);
      return {
        id: item.customId,
        name: product?.name,
        images: product?.images,
        rating: product?.rating,
        description: product?.description,
        size: item.size,
        price: product?.price,
        count: item.count,
        sizes: product?.sizes,
        sale: product?.sale,
      };
    });
  }, [currentUser, products]);

  if (!currentUser) {
    return (
      <div className={className}>
        <h2>Корзина</h2>
        <p>Вы не авторизованы</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <Loader />;
  }

  const postInServer = (cart) => {
    const orderNum = new Date().getTime();
    const post = cart.reduce((acc, item) => {
      acc.push({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        count: item.count,
        sale: item.sale,
        finishPrice: Math.floor(finishPrice()),
      });
      return acc;
    }, []);

    dispatch(createOrder(orderNum, currentUser, post));
    navigate(`/cart/order/${orderNum}`);
  };

  const finishPrice = () => {
    return cartAndProduct.reduce((acc, item) => {
      const count = Number(item.count) || 0;
      const price = Number(item.price) || 0;
      const sale = Number(item.sale) || 0;
      const finalPrice = price * (1 - sale / 100);
      return acc + count * finalPrice;
    }, 0);
  };

  const totalItems = cartAndProduct.reduce(
    (acc, item) => acc + (Number(item.count) || 0),
    0,
  );

  const totalSavings = cartAndProduct.reduce((acc, item) => {
    if (!item.sale) return acc;
    const count = Number(item.count) || 0;
    const price = Number(item.price) || 0;
    const sale = Number(item.sale) || 0;
    const savingsPerItem = price * (sale / 100);
    return acc + count * savingsPerItem;
  }, 0);

  return (
    <div className={className}>
      <h1>Корзина</h1>
      {currentUser ? (
        <div className="cart">
          <div className="cart-list">
            {cartAndProduct.length === 0 ? (
              <div className="cart-null">
                <p>Корзина пуста</p>
                <Button
                  onClick={() => {
                    navigate("/catalog");
                  }}
                  width={"300"}
                >
                  Вперед за покупками!
                </Button>
              </div>
            ) : (
              cartAndProduct.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    currentUser={currentUser}
                    item={item}
                    cart={cartAndProduct}
                  />
                );
              })
            )}
          </div>
          {cartAndProduct.length > 0 && (
            <aside className="cart-summary">
              <div className="summary-card">
                <div className="summary-row">
                  <span>Товары</span>
                  <b>{totalItems}</b>
                </div>
                <div className="summary-row">
                  <span>Экономия</span>
                  <b>{Math.floor(totalSavings)} руб.</b>
                </div>
                <div className="summary-total">
                  <span>К оплате</span>
                  <span className="summary-amount">
                    {Math.floor(finishPrice())} руб.
                  </span>
                </div>
                <Button
                  onClick={() => {
                    postInServer(cartAndProduct);
                  }}
                  width="100%"
                >
                  Оформить заказ
                </Button>
                <p className="summary-hint">
                  Нажимая кнопку, вы перейдёте к оформлению заказа.
                </p>
              </div>
            </aside>
          )}
        </div>
      ) : (
        <p>Вы не авторизованы</p>
      )}
    </div>
  );
};

export const Cart = styled(CartContainer)`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h1 {
    margin-bottom: 0;
  }

  & .cart {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
  }

  & .cart-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & .cart-summary {
    position: sticky;
    top: 190px;
    align-self: flex-start;
  }

  & .summary-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 300px;
  }

  & .summary-row {
    display: flex;
    justify-content: space-between;
    color: #6b7280;
    font-size: 15px;
  }

  & .summary-total {
    padding: 12px 0 4px;
    border-top: 1px solid rgba(15, 23, 42, 0.07);
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  & .summary-amount {
    font-size: 22px;
    color: var(--purple-color);
  }

  & .summary-hint {
    font-size: 13px;
    color: #9ca3af;
    margin: 0;
  }

  & .cart-null {
    width: 100%;
    min-height: 320px;
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    text-align: center;
    padding: 32px;

    & p {
      font-size: clamp(20px, 3vw, 26px);
      margin: 0;
      color: #374151;
    }
  }

  @media (max-width: 992px) {
    & .cart {
      grid-template-columns: 1fr;
    }

    & .cart-summary {
      position: static;
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 28px;
    }
  }
`;
