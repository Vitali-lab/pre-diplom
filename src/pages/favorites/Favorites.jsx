import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FavoritesContainer = ({className}) => {

    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate()
    return (
        <div className={className}>
    
            {currentUser && currentUser.likes.map(like => {
                return (
                    <div key={like.id} className="like-products" onClick={() => {navigate(`/catalog/${like.id}`)}}>
                        <img src={like.images[0]} alt="" />
                        <p>{like.name}</p>
                        <p>{like.price}</p>
                    </div>
                )
            })}
        </div>
    )
}

export const Favorites = styled(FavoritesContainer)`
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
flex-wrap: wrap;
gap: 20px;
width: 1600px;
background-color: #ffffffff;
margin: 50px 0 0 0;
border-top: 1px solid #ccccccff;
border-bottom: 1px solid #ccccccff;
& .like-products{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 20px;
    margin: 20px 0 0 0;
    cursor: pointer;
    & img {
        width: 300px;
        height: 450px;}}
`