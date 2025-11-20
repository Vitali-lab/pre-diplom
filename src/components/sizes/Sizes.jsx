import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../bff/api/back-end/add-to-cart";
import { notifyError, notifySuccess } from "../../func/notification";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SizesContainer = ({
  className,
  sizesKeys,
  product,
  activeButton,
  setActiveButton,
  setOpenSizesId,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.user.currentUser?.cart);
  const navigate = useNavigate();

  const onSubmit = (size) => {
    setActiveButton(size);
    if (location.pathname === "/catalog" && currentUser) {
      if (!currentUser) {
        notifyError("Войдите в аккаунт чтобы добавить в корзину");
        return;
      }
      const selectedSize = size;
      const customId = `${product.id}-${selectedSize}`;
      const isInCart = cart.find(
        (item) => item.customId === customId && item.size === selectedSize,
      );

      if (!isInCart) {
        dispatch(
          addToCart(
            currentUser.id,
            product.id,
            customId,
            selectedSize,
            1,
            product.sale,
          ),
        );
        notifySuccess(
          `${product.name} размера ${selectedSize} добавлен в корзину`,
          () => {
            navigate("/cart");
          },
        );
        setOpenSizesId(null);
        setActiveButton(null);
      } else {
        notifyError(
          `${product.name} размера ${selectedSize} уже есть в корзине`,
          () => {
            navigate("/cart");
          },
        );
        setOpenSizesId(null);
      }
    }
  };

  if (location.pathname === "/catalog" && currentUser) {
    return (
      <div className={className}>
        {sizesKeys.length < 0 ? (
          <p>Нет в наличии</p>
        ) : (
          sizesKeys.map((size, index) => {
            if (product.sizes[size] !== 0)
              return (
                <button
                  className={activeButton === size ? "active" : "not-active"}
                  onClick={() => {
                    onSubmit(size);
                  }}
                  key={index}
                >
                  {size}
                </button>
              );
          })
        )}
      </div>
    );
  } else {
    return (
      <div className={className}>
        {sizesKeys.length < 0 ? (
          <p>Нет в наличии</p>
        ) : (
          sizesKeys.map((size, index) => {
            if (product.sizes[size] !== 0)
              return (
                <button
                  className={
                    activeButton === size
                      ? "active-in-product"
                      : "not-active-in-product"
                  }
                  onClick={() => {
                    onSubmit(size);
                  }}
                  key={index}
                >
                  {size}
                </button>
              );
          })
        )}
      </div>
    );
  }
};

export const Sizes = styled(SizesContainer)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 10px;

  & .active-in-product {
    width: 50px;
    height: 50px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: var(--purple-color);
    color: #fdfbfbff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
  }

  & .not-active-in-product {
    width: 50px;
    height: 50px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: transparent;
    color: #0f0f0fff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      transition: all ease 0.5s;
      background-color: var(--purple-color);
      color: #ffffffff;
    }
  }

  & .active {
    width: 30px;
    height: 30px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: var(--purple-color);
    color: #fdfbfbff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
  }

  & .not-active {
    width: 30px;
    height: 30px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: transparent;
    color: #0f0f0fff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      transition: all ease 0.5s;
      background-color: var(--purple-color);
      color: #ffffffff;
    }
  }
`;
