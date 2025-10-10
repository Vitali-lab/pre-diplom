import styled from "styled-components";

const RecentlyViewedContainer = ({className}) => {

    const views = JSON.parse(sessionStorage.getItem('products'));
    
    

    return (
        <div className={className}>
            <h1>Недавно просмотренные</h1>
            <div className="products">
             {views.length === 0 ? <p>Вы ничего не просматривали</p> 
             :views.map((product) => {
                return(
                <div className="product" key={product.id}>
                    <img src={product.images[0]} alt="" />
                    <p>{product.name}</p>
                    <p>{product.price} руб.</p>
                </div>)
                }) }
            </div>
        </div>
    )
}

export const RecentlyViewed = styled(RecentlyViewedContainer)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
width: 1600px;
background-color: #ffffffff;
margin: 50px 0 0 0;

& .products{
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
gap: 20px;
margin: 20px 0 0 0;
& img {
    width: 300px;
    height: 450px;}
}
`