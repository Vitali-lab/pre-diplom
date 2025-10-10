import { Icon } from "../../components/icon/Icon";
import { useSelector  } from "react-redux";
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import styled from "styled-components";
import { ProductList } from "./components/product-list/ProductList";


const AdminPanelContainer = ({className}) => {

    const [productsOpen, setProductsOpen] = useState(false);
    const navigate = useNavigate();
 
    const products = useSelector(state => state.products.products);
    const categories = useSelector(state => state.products.categories);
    const [openModal , setOpenModal] = useState(false);
   const [productId, setProductId] = useState('');
    
    
 const currentCategory = (product)=> {
    const currentCategory = categories.find((category) => category.id === product.category_id)
    return currentCategory ? currentCategory.name : '';
}
    


 

  

    return (
        <div className={className}>
            <>
            {openModal && <Modal productId={productId} setOpenModal={setOpenModal}>Вы действительно хотите удалить товар ?</Modal>}
            <div>
                <h1>Панель администратора</h1>
            </div>
            <div className="buttons-add">
                <Button width={'300px'} onClick={() => navigate('/admin-panel/add-product')}>Добавить товар</Button>
                <Button width={'300px'} onClick={() => navigate('/admin-panel/edit-params')}>Изменить параметры</Button>

            </div>
            <div className="products">
                <div className="header-section" onClick={() => setProductsOpen(!productsOpen)}>
                <h2>Список товаров</h2>
                <Icon id={productsOpen ? "angle-up" : "angle-down"}/>
                </div>
                {productsOpen && <ProductList productsOpen={productsOpen} products={products} currentCategory={currentCategory} setOpenModal={setOpenModal} setProductId={setProductId}/>}  
               
            </div>
            <div></div>
            </>
        </div>
    )
}

export const AdminPanel = styled(AdminPanelContainer)`
width: 1600px;

padding: 40px;
& .header-section{
width: 1580px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
text-align: center;
padding: 10px;
border: 1px solid #ccccccff;
font-weight: bold;
border-radius: 10px;
margin: 20px 0 0 0;
cursor: pointer;
}
& h2{
    margin: 0;
}

& .buttons-add{
    display: flex;
    gap: 20px;
    margin: 30px 0 0 0;}

`