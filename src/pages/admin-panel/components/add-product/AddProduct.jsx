import { Input } from "../../../../components/input/Input"
import { useSelector ,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../components/button/Button"
import { postProduct } from "../../../../bff/api/post-product"
import { useState } from "react"
import styled from "styled-components"
import { img } from "framer-motion/client"

const AddProductContainer = ({className}) => {

    const allCategories = useSelector(state => state.products.categories);
    const allSeasons = useSelector(state => state.products.seasons);

    
   const navigate = useNavigate();
    const [sizes, setSizes] = useState({
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0
    });

    const [category, setCategory] = useState('');
    const [season, setSeason] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUtl] = useState('');

    const dispatch = useDispatch();
    
    const onSubmit = () => {
        dispatch(postProduct(name, description, price, image, category, season, sizes));
        navigate('/admin-panel')
    } 
    console.log(imageUrl);
    

    return (
        <div className={className}>
            <div className="add-product">
                <div className="info">
                <h3>Введите информацию о товаре</h3>
              <Input text={"Название"} width={"300px"} onChange={(e) => setName(e.target.value)} /> 
              <Input text={"Описание"} width={"300px"} onChange={(e) => setDescription(e.target.value)} />
              <Input text={"Цена"} width={"300px"} onChange={(e) => setPrice(e.target.value)} />
              <Input text={"Фото (url временно)"} value={imageUrl} width={"300px"} onChange={(e) => setImageUtl(e.target.value)}  />
              <Button width={"300px"} onClick={(e) => {
                setImage([...image, imageUrl])
                setImageUtl('')
              }}>Добавить изоображение</Button>
            </div>
            
            <div className="info">
                <h3>Выберите категорию и сезон</h3>
                Категории:
              <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                {allCategories.map(item => (<option value={item.id}>{item.name}</option>))}
              </select>
              Сезон:
              <select name="" id="" onChange={(e) => setSeason(e.target.value)}>
                {allSeasons.map(item => (<option value={item.id}>{item.name}</option>))}
              </select>
            </div>
            
            <div className="info">
                <h3>Укажите размеры</h3>
                <div className="inputs">
                <Input text={"XL"} width={"150px"} onChange={(e) => setSizes({...sizes, XL: e.target.value})} />
                <Input text={"L"} width={"150px"} onChange={(e) => setSizes({...sizes, L: e.target.value})} />
                <Input text={"M"} width={"150px"} onChange={(e) => setSizes({...sizes, M: e.target.value})} />
                <Input text={"S"} width={"150px"} onChange={(e) => setSizes({...sizes, S: e.target.value})} />
                <Input text={"XS"} width={"150px"} onChange={(e) => setSizes({...sizes, XS: e.target.value})} />

                </div>
            </div>
            </div>
            <div className="images">
                {image.map((img) => {
                    return <img src={img} alt="" />
                } 
                    
                )}
            </div>
            <div className="button-add">
                <Button width={"200px"} onClick={onSubmit}>Добавить товар</Button>
            </div>
            
        </div>
    )
}

export const AddProduct = styled(AddProductContainer)`
width: 1600px;
padding: 40px;


& .button-add{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
}

& .add-product{
display: flex;
gap: 20px;
}

    & .inputs {
    display: flex;
    width: 400px;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    
}
    & .info{
    display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccccccff;
    border-radius: 10px;
    padding: 40px 0;}


 & select{
    width: 200px;
    padding: 10px;

    border: 1px solid #ccccccff;
    border-radius: 10px;
 }  
    & .images{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        margin: 20px 0 0 0;
        width: 1300px;
    }
   
`