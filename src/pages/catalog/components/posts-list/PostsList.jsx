import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/button/Button";
import { Icon } from "../../../../components/icon/Icon";
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
`;


const PostsListContainer = ({ className , products}) => {
 

   

 const navigate = useNavigate();
    


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
     <div className="container">
     <div className={className}>
       
          {Array.isArray(products) && (
  <AnimatePresence>
    {products.map((post) => (
      <motion.div
        key={post.id}
        className="post"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileTap={{ scale: 0.97 }}
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
        <Icon id="heart-o" color="#0a0a0aff" size="18"/>
        <Icon id="shopping-bag" color="#0c0c0cff" size="18"/>
        </ProductIcons>
        
      </motion.div>
    ))}
  </AnimatePresence>
)}
     </div>
     <div className="pagination">
     <Button>Показать ещё</Button>
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
        justify-content:center;
        align-items: center;
        gap: 25px;
        margin: 20px 0 0 0;
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
    cursor: pointer;
    
    
    
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