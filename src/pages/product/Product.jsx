

import { useEffect,useState } from "react";
import { getProduct } from "../../bff/api/get-product";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const ProductContainer = ({className}) => {

    const params = useParams();

    const [product, setProduct] = useState({});
    

    useEffect(()=>{
    getProduct(params.id)
    .then((data)=>setProduct(data))
    },[])

    return (
       
         <div className={className}>
            <div className="images">
                {Array.isArray(product.images)? (product.images.map((image, index) => {
                    return (
                        <div key={index} className="image">
                            <img src={image} alt="" />
                        </div>
                    )
                })): null}
            </div>
             <h1>{product.name}</h1>
             <p>{product.description}</p>
             <p>{product.category}</p>
             <p>{product.rating}</p>
             <p>{product.price}</p>
         </div>
        
    )
}

export const Product = styled(ProductContainer)`
width: 1600px;
padding: 40px;
border-radius: 10px;
-webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
-moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
background-color: #ffffffff;
& .images{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    & img{
        width: 400px;
        height: 700px;
    }
}
`