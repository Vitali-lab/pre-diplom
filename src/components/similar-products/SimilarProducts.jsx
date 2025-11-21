import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProductsSlider } from "../slider/Slider";
import Loader from "../loader/Loader";

const SimilarProductsContainer = ({ className, product }) => {
  const products = useSelector((state) => state.products.products);

  console.log(products, "13123123123");

  if (!products) {
    return <Loader />;
  }

  const isSimilar = products.filter(
    (item) => item.categoryId === product.categoryId && item.id !== product.id,
  );

  return (
    <div className={className}>
      <h1>Похожие </h1>
      <ProductsSlider key={product.id} products={isSimilar} />
    </div>
  );
};

export const SimilarProducts = styled(SimilarProductsContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  padding: 0 20px;
  margin: 50px 0 50px 0;
  border-radius: 20px;
  background-color: var(--sec-bg-color);
  & h1 {
    text-align: center;
    font-size: 40px;
  }

  & .nothing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px;
    width: 1600px;
  }
`;
