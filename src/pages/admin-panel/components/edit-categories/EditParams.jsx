import { useSelector } from "react-redux";
import { postCategory } from "../../../../bff/api/post-category";
import { useState } from "react";
import { deleteCategory } from "../../../../bff/api/delete-category";
import { deleteSeason } from "../../../../bff/api/delete-season";
import { postSeason } from "../../../../bff/api/post-season";
import { Params } from "./components/Params";
import { AddParams } from "./components/AddParams";
import styled from "styled-components";


const EditParamsContainer = ({className}) =>{
     
    const seasons = useSelector(state => state.products.seasons);
    const categories = useSelector(state => state.products.categories);
    const [newCategory, setNewCategory] = useState('');
    const [newSeason, setNewSeason] = useState('');

    return(
        <div className={className}>
            <h1>Редактирование категории</h1>
            <div className="container">
            <Params params = {categories} deleteFunc = {deleteCategory} />
            <Params params = {seasons} deleteFunc = {deleteSeason} />
            <div className="add-params-block">
            <AddParams postFunc = {postCategory} inputValue = {newCategory} setInputValue = {setNewCategory} text = "новой категории" />
            <AddParams postFunc = {postSeason} inputValue = {newSeason} setInputValue = {setNewSeason} text = "нового сезона" />
            </div>
            </div>
        </div>
    )
}

export const EditParams = styled(EditParamsContainer)`
width: 1600px;
padding: 40px;


& .add-params-block{
    display: flex;
    flex-direction: column;
    gap: 30px;
    }
& .container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    gap: 20px;
}


`