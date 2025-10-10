import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Icon } from "../../../../components/icon/Icon";
import { Button } from "../../../../components/button/Button";
import styled ,{keyframes} from "styled-components";
import { Input } from "../../../../components";

const openAnimation = keyframes`
from{
    
    transform: translateY(-30px);
}
to{
    opacity: 1;
    transform: translateY(0px);
}
`


const FiltrationContainer = ({className ,setProducts}) => {


   const allProducts = useSelector(state => state.products.products);
   const [seasons, setSeasons] = useState([]);
   const [categories, setCategories] = useState([]);
   const [prices, setPrices] = useState([]);
   const [minPriceInput, setMinPriceInput] = useState('');
   const [maxPriceInput, setMaxPriceInput] = useState('');
    const allCategories = useSelector(state => state.products.categories);
    const allSeasons = useSelector(state => state.products.seasons);
   
   


   
  
   
   

    const onCheck = ( {target} ) => {
        if(target.checked){
          setSeasons(prev => ([...prev, target.name]))
        } else if(!target.checked){
         setSeasons(prev => prev.filter(season => season !== target.name))
        
        }
         
}
  const onCheckCategory = ( {target} ) => {
    if(target.checked){
      setCategories(prev => ([...prev, target.name]))
    } else if(!target.checked){
     setCategories(prev => prev.filter(category => category !== target.name))
     
    }
     
}

 const onCheckPrice = ({target}) => {
    if(target.checked){
     setPrices(target.checked);
   const filteredProducts = allProducts.filter((product)=> product.price >= minPriceInput && product.price <= maxPriceInput)
   setProducts(filteredProducts)
    } else {
        setPrices(target.checked);
        
    }
   
   }
   






useEffect(()=>{

 const filtered = allProducts.filter(({season_id:season,category_id:category }) => { 
   const seasonOk = seasons.length === 0 || seasons.includes(season) 
   const categoryOk = categories.length === 0 || categories.includes(category)
   
   
   return seasonOk && categoryOk 

 })


 
 setProducts(filtered)


},[seasons,categories,allProducts])

        

    return (
        <div className={className}>
            <div className={ 'name-open' } > 
                <h3>Сезон</h3>

            </div>
            <div className="seasons" onChange={onCheck}>
                {allSeasons.map(season => 
                    (<div className="season" key={season.id}>
                    <span>{season.name}</span>
                    <input type="checkbox" name={season.id} />
                </div>))}
            </div>
            <div className={'name-open'} > 
                <h3>Категории</h3>

            </div>
            <div className="seasons" onChange={onCheckCategory}>
                {allCategories.map(category => 
                    (<div className="season" key={category.id}>
                    <span>{category.name}</span>
                    <input type="checkbox" name={category.id} />
                </div>))}
                
            </div>
            <div className={'name-open'} > 
                <h3>Цена</h3>
            </div>
            <div className="seasons" onChange={onCheckPrice}  >
            <Input text={"от"} max={'100'} type = "number" width = "80px" onChange={(e) => {setMinPriceInput(e.target.value)}}/>
            <Input text={"до"} type = "number" width = "80px" onChange={(e) => {setMaxPriceInput(e.target.value)}}/>
             <input type="checkbox"/>
             </div>
            
        </div>
    )
}

export const Filtration = styled(FiltrationContainer)`
width: 310px;
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
gap: 20px;
margin-top: 30px;

& .name-open {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
border-bottom: 1px solid #ccccccff;
padding: 3px 0;
cursor: pointer;
}
& .name-close {
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
border-bottom: 1px solid #ccccccff;
padding: 3px 0;
& i{
    transform: rotate(180deg);}
}

 & .seasons {
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: start;
 align-items: start;
 gap: 15px;
 animation: ${openAnimation} 0.2s linear;
 
 }

 & .season {
 width: 110px;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 border-bottom: 1px solid #ccccccff;
 padding: 5px;
 }
 & .season span{
    font-size: 14px;
    padding: 5px;
    
 }
 & .season input{
    cursor: pointer;
 }
  

`