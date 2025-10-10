import { useNavigate } from "react-router-dom";
import { Icon } from "../../../../components/icon/Icon";
import styled  from "styled-components";



const ProductListContainer = ({className  , products , currentCategory , setOpenModal , setProductId}) => {
const navigate = useNavigate();
    return (
        <div className={className}>
                          <div>
                              <div className="header">
                                      <p>Фото</p>
                                      <p>Название</p>
                                      <p>Цена</p>
                                      <p>Категория</p>
                                      <p>Размеры</p>
                                      <p>Рейтинг</p>
                                      <p> </p>
                                      </div>
                              { products.length > 0 && products.map((product, index) => {
                                  return (
                                      <div key={`${product.id}-${index}`}>
                                      <div className="product" >
                                          <img src={product.images[0]} alt="" />
                                          <p>{product.name}</p>
                                          <p>{product.price}</p>
                                          <p>{currentCategory(product)}</p>
                                          <div className="sizes">
                                              <span>XL : {product.sizes.XL || 'нету в наличии'}</span>
                                              <span>L : {product.sizes.L || 'нету в наличии'}</span>
                                              <span>M : {product.sizes.M || 'нету в наличии'}</span>
                                              <span>S : {product.sizes.S || 'нету в наличии'}</span>
                                          </div>
                                          <p>{product.rating}</p>
                                          <div>
                                              <Icon id = "trash" onClick={() => {
                                                  setProductId(product.id)
                                                  setOpenModal(true);
                                                  
                                                  }}/>
                                              <Icon id = "edit" onClick={()=>{navigate(`/admin-panel/edit-product/${product.id}`)}}/>
                                          </div>
                                      </div>
                                      </div>
                                  )
                              })}
                          </div>
        </div>
    )
}

export const ProductList = styled(ProductListContainer)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
width: 1600px;
background-color: #ffffffff;
margin: 30px 0 0 0;

& .header{
     width: 1600px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #ccccccff;
        
        font-weight: bold;
    & p {
        margin: 0;
        width: 50px;
    }
        & p:first-child {
        margin: 0;
        width: 70px;
    }
}
   
& .products{
    width: 1600px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 20px;
    margin: 20px 0 0 0;
}
    & .product{
        width: 1600px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-bottom: 1px solid #ccccccff;
        & img{
            width: 70px;
            height: 100px;
        }
            & p {
                margin: 0;
                width: 180px;
                text-align: center;
            }
    }
            
}

 & .sizes{
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
`