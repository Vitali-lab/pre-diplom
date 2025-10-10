import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "../../../../components/input/Input";
import styled from "styled-components";

const EditProductContainer = ({className}) => {

    const params = useParams();

    console.log(params.id);
    const product = useSelector(state => state.products.products.find(item => item.id === params.id));
    
    console.log(product);
    

    return (
        <div className={className}>
            <h1>Редактирование товара {product.name}</h1>
            
             {product
             ? <div className="container">
                <div className="inputs">
                <Input text={"Название"}/>
                <Input text={"Описание"}/>
                <Input text={"Цена"}/>
                </div>
                <div className="selects">
                 <p>Категории</p>
                <select name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <p>Сезон</p>
                <select name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <p>Размеры</p>
                <select name="" id="">
                    <option value={product.size}>XL</option>
                    <option value="2">L</option>
                </select>
                </div>
                <div className="product-prewiew">
            <img src={product.images[0]} alt={""} />
            <h2>{product.name}</h2>
             <p>{product.description}</p>
             <p>{product.category}</p>
             <p>{product.rating}</p>
             <p>{product.price}</p>
            </div>
             </div> 
             : "Товар не найден" }
        </div>
    )
}

export const EditProduct = styled(EditProductContainer)`
width: 1600px;
padding: 40px;
border-radius: 10px;
-webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
-moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
 
& .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
& .inputs {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 20px;
}
& .selects {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 20px;
 
}
    & .product-prewiew {
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 541px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding: 15px;
    cursor: pointer;
     
    & img {
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
    & h2 {
        margin: 10px 0;
        font-size: 16px;
        font-weight: 500;
    }
    & p {
        margin: 5px 0;
   
    }
 }
    
`