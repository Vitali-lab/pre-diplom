import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Icon } from "../icon/Icon";
import styled from "styled-components";
import { useToggleFavorites } from "../../hooks/use-toggle-favorites";


const ProductName = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin: 3px 0 0 0;
`;
const ProductPrice = styled.div`
    font-size: 14px;
    font-weight: 600;
    margin: 10px 0 0 0;
`;
const ProductIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    gap: 10px;
    margin: 10px 0 0 0;
    & .bag i{
        cursor: pointer;
        transition: all ease 0.5s;
        
    }
`;


const ProductContainer = ({className, products, post}) => {
console.log(post);

    const {toggleFavorites,isUserLike} = useToggleFavorites()
    const navigate = useNavigate()

const onProductClick = (id) => {
   navigate(`/catalog/${id}`)
    
    const storage = [...JSON.parse(sessionStorage.getItem('products'))] 
    const product = products.find(item => item.id === id)
    
    
    
    if(storage.length === 0 || !storage.find(item => item.id === id)){
      storage.push(product)
    } 
     
    sessionStorage.setItem('products', JSON.stringify(storage))
  };


    return (
        <div className={className}>
            <motion.div
                    key={post.id}
                    className="post"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    
                  >
                     
                    <div onClick={() => onProductClick(post.id)}>
                        <img src={post.images[0]} alt={post.name} />
                    <ProductName  >
                        <h2>{post.name}</h2>
                    </ProductName>
                    <ProductPrice>
                        <p>{post.price} руб.</p> 
                    </ProductPrice>
                    </div>
                    <ProductIcons>
                  <Icon className="heart" 
                  id={isUserLike(post) ? "heart" : "heart-o"} 
                  color={isUserLike(post) ? "#cf2b2bff" : "#0a0a0aff"} 
                  size="18" 
                  onClick={() => toggleFavorites(post)}/>
                    <Icon className="bag" id="shopping-cart" color="#0c0c0cff" size="18"/>
                    </ProductIcons>
                    
                  </motion.div>
        </div>
    )
}

export const Product = styled(ProductContainer)`

`