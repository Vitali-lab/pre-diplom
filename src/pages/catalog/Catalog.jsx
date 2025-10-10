import { useEffect ,useState } from "react";
import { PostsList } from "./components/posts-list/PostsList";
import {  useSelector } from "react-redux";
import { Filtration } from "./components/filtration/Filtration";
import styled from "styled-components";

const CatalogContainer = ({ className }) => {

    const products = useSelector(state => state.products.products);

      const [productsFiltered, setProductsFiltered] = useState([]);
      
  

useEffect(() => {
  setProductsFiltered(products);
}, [products]);


 
    return (
        <div className={className}>
            <Filtration productsFiltered={productsFiltered} setProducts={setProductsFiltered}   />
            <PostsList products={productsFiltered} />
        </div>
    );
};

export const Catalog = styled(CatalogContainer)`

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: start;
width: 1650px;
gap: 15px;
padding: 30px 20px;


}
`
