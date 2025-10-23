import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button";
import { Icon } from "../../../../components/icon/Icon";
import { useToggleFavorites } from "../../../../hooks/use-toggle-favorites";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";


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


const PostsListContainer = ({ className , products}) => {
 

  
 const navigate = useNavigate();

const {toggleFavorites,isUserLike} = useToggleFavorites()




const onProductClick = (id) => {
   navigate(`/catalog/${id}`)
    
    const storage = [...JSON.parse(sessionStorage.getItem('products'))] 
    const product = products.find(item => item.id === id)
    
    
    if(storage.length === 0 || !storage.find(item => item.id === id)){
      storage.push(product)
    } 
     
    sessionStorage.setItem('products', JSON.stringify(storage))
  };
  


const [pagination , setPagination] = useState(12)
    

 
 
  

    return (
     <div className="container">
     <div className={className}>
       
          {Array.isArray(products) && (
  <AnimatePresence>
    {products.slice(0, pagination).map((post) => (
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
    ))}
  </AnimatePresence>
)}
     </div>
     <div className="pagination">
     {products.length > 12 && (
       <Button width = "200px" onClick = {() => setPagination(pagination + 3)} >Показать ещё</Button>
     )}
     </div>
     </div>
    )
};

export const PostsList = styled(PostsListContainer)`
width: 1300px;
display: flex;
flex-direction: row;
justify-content: start;
flex-wrap: wrap;
align-items: center;
gap: 25px;
width: 1300px;
magin: 0 auto;
margin-left: 0px;
margin-bottom: 100px;
margin-top: 30px;

 & i{
 cursor: pointer;
 }
 & i:active{
 transition: all ease 0.2s;
     transform: scale(0.7);
 }

& .container{
    width: 1300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
}

& .pagination{
    width: 1300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

}

& .post{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 270px;
    height: 541px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding: 15px;
    
 
    
    
    & img{
        width: 270px;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
        transition: all ease-in 0.5s;
        &:hover{
        transform: scale(0.9);
        transition: all ease 0.5s;
        
    
        }
    }
     & p {
        margin: 0px;
     }
     & h2 {
        margin: 0px;
        font-weight: 500;
     }      
}
   
`;