import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProductCard } from "../../components/product-card/ProductCard";
import { useEffect } from "react";
import { scrollTop } from "../../utils/scrollTop";
import { productsSelector, userSelector } from "../../selectors";

const FavoritesContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const products = useSelector(productsSelector);

  useEffect(() => {
    scrollTop();
  }, []);

  if (!currentUser) {
    return (
      <div className={className}>
        <h1>
          Зарегистрируйтесь или авторизируйтесь, чтобы увидеть свои любимые
          товары
        </h1>
      </div>
    );
  }

  const userFavorites = products.filter((product) => {
    return currentUser.favorites.find((fav) => fav.id === product.id);
  });

  return (
    <div className={className}>
      <h1>Избранное</h1>
      <div className="favorites">
        {currentUser ? (
          userFavorites.map((post) => {
            return <ProductCard post={post} />;
          })
        ) : (
          <div className="alert">
            <h2>
              Зарегистрируйтесь или авторизируйтесь, чтобы увидеть свои любимые
              товары
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export const Favorites = styled(FavoritesContainer)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
flex-wrap: wrap;
padding: 0px;
gap: 20px;
width: 95%;
background-color: #ffffffff;
margin: 20px auto;

& .favorites {
display: flex;
width: 1200px;
flex-direction: row;
justify-content: start;
align-items: center;
flex-wrap: wrap;
gap:40px;
}

& .alert{
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    font-weight: bold;
}



& .like-products{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 20px;
    margin: 20px 0 0 0;
    cursor: pointer;
    & img {
        width: 300px;
        height: 450px;}
        }


@ media (max-width: 1500px) {
    width: 100%;
    font-size: 12px;
}
`;
