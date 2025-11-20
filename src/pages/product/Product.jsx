import { useEffect, useLayoutEffect, useState } from "react";
import { getProduct } from "../../bff/api/get-product";
import { useParams } from "react-router-dom";
import { Icon } from "../../components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess, notifyError } from "../../func/notification";
import { useToggleFavorites } from "../../hooks/use-toggle-favorites";
import styled, { keyframes } from "styled-components";
import { Button } from "../../components/button/Button";
import { Sizes } from "../../components/sizes/Sizes";
import { addToCart } from "../../bff/api/back-end/add-to-cart";
import { useNavigate } from "react-router-dom";
import { SimilarProducts } from "../../components/similar-products/SimilarProducts";
import { Comments } from "./components/Comments";
import { RatingStars } from "../../components/raring-stars/RatingStars";
import { Rating } from "./components/Rating";
import Loader from "../../components/loader/Loader";
import { RecentlyViewed } from "../../components/recently-viewed/RecentlyViewed";
import { Description } from "./components/Description";
import { useProductLabels } from "../../hooks/use-product-labels";
import { Images } from "./components/Images";
import { SalePrice } from "../../components/sale-price/SalePrice";
import { scrollTop } from "../../utils/scrollTop";

const openAnimation = keyframes`
from{
    
    opacity: 0;
    transform: translateY(-30px);
}
to{
    opacity: 1;
    transform: translateY(0px);
}
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  margin: 30px 0 0 0;
  animation: ${openAnimation} 0.5s ease;
`;

const AboutCurrentSizeDiv = styled.div`
  font-size: 10px;
  margin: 0px;
  width: 100%;
  animation: ${openAnimation} 0.5s ease;
  & p {
    font-size: 15px;
    margin: 20px 0 0 0px;
  }
`;

const CommentsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SimilarProductsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductContainer = ({ className }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const product = useSelector((state) => state.product?.product);
  const cart = useSelector((state) => state.user.currentUser?.cart);

  const [activeButton, setActiveButton] = useState("");
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  const { toggleFavorites, isUserLike } = useToggleFavorites();
  const { getCategoryName } = useProductLabels();

  useLayoutEffect(() => {
    dispatch(getProduct(params.id));
    scrollTop();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product?.rating?.users && currentUser?.id) {
      const userRatingObj = product.rating.users.find(
        (user) => user.userId === currentUser.id,
      );
      if (userRatingObj) setUserRating(userRatingObj.userRating);
    }
  }, [product, currentUser]);

  if (!product || Object.keys(product).length === 0) {
    return <Loader />;
  }

  const sizesKeys = Object.keys(product?.sizes || {});

  const addToCard = () => {
    if (!activeButton) {
      notifyError("Выберите размер");
      return;
    }
    if (!currentUser) {
      notifyError("Войдите в аккаунт чтобы добавить в корзину");
      return;
    }
    const exists = cart?.find(
      (item) =>
        item.customId === `${product.id}-${activeButton}` &&
        item.size === activeButton,
    );

    if (!exists) {
      dispatch(
        addToCart(
          currentUser.id,
          product.id,
          `${product.id}-${activeButton}`,
          activeButton,
          1,
          product.sale,
        ),
      );
      setActiveButton("");
      notifySuccess(
        `${product.name} размера ${activeButton} добавлен в корзину`,
        () => navigate("/cart"),
      );
    } else {
      notifyError(`${product.name} размера ${activeButton} уже есть в корзине`);
    }
  };

  return (
    <div className={className}>
      <div className="product-main">
        <div className="images">
          <Images product={product} />
        </div>
        <div className="information">
          <h1>{product.name}</h1>
          <div className="header-rating">
            <p>{getCategoryName(product.categoryId)}</p>
          </div>
          <div>
            <SalePrice post={product} size={"24"} />
          </div>

          <Sizes
            sizesKeys={sizesKeys}
            product={product}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />

          {activeButton && (
            <AboutCurrentSizeDiv>
              <p>Выбран размер: {activeButton}</p>
            </AboutCurrentSizeDiv>
          )}

          <ButtonsDiv>
            <Button disabled={!activeButton} width="350px" onClick={addToCard}>
              {activeButton
                ? `Добавить в корзину: ${product.name} размер: ${activeButton}`
                : "Выберите размер"}
            </Button>
            <Button width="350px" onClick={() => toggleFavorites(product)}>
              {isUserLike(product)
                ? "Убрать из избранного"
                : "Добавить в избранное"}
            </Button>
          </ButtonsDiv>

          {currentUser && (
            <Rating
              userRating={userRating}
              setUserRating={setUserRating}
              hover={hover}
              setHover={setHover}
              product={product}
              currentUser={currentUser}
              comment={comment}
              setComment={setComment}
            />
          )}
        </div>
      </div>

      <Description product={product} />
      <Comments product={product} />
      <SimilarProducts product={product} />
      <RecentlyViewed />
    </div>
  );
};

export const Product = styled(ProductContainer)`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  animation: ${openAnimation} ease 0.7s;

  .product-main {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 80px;
    align-items: flex-start;
  }

  .images {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .information {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 40px 0 0 0;
    & h1 {
      font-size: 30px;
      font-weight: bold;
      margin: 0;
    }

    & h4 {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    p {
      font-size: 16px;
      margin: 0;
      color: var(--grey-color);
    }
  }

  .price {
    font-size: 20px;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    .product-main {
      flex-direction: column;
      align-items: center;
    }
    .images,
    .information {
      width: 100%;
    }
  }
`;
