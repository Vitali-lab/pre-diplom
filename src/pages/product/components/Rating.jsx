
import styled from "styled-components";
import { Button } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import { RatingStars } from "../../../components/raring-stars/RatingStars";
import { editRating } from "../../../bff/api/back-end/edit-rating";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../../func/notification";


const RatingContainer = ({className , setHover, userRating, setUserRating, hover, product, currentUser ,comment, setComment}) => {

    const dispatch = useDispatch();

    
     const isRating = ( ) => {
        if(currentUser && product?.rating?.users.find(user => user.userId === currentUser.id)){
            return true
        }
    }

    const handleRating = () => ({
            userId:currentUser.id,
            userRating:userRating,
            postId:product.id,
            userComment:comment,
            date:new Date().toISOString()
        })
    
        const addRating =  () => {
            try {
              const res =  dispatch(editRating(handleRating()))
              console.log(res,'res');
              
              if(!res){
                  throw new Error(res)  
              }
              else {
                  notifySuccess('Cпасибо за оценку')
                  setComment('')
              }
            } catch (error) {
                notifyError(error.message)  
            }
        }

    return(
        <div className={className}>
            {!isRating() && 
            <RatingStars 
            setHover={setHover} 
            userRating={userRating} 
            hover={hover} 
            setUserRating={setUserRating}
            isRating={isRating} />}
            {isRating() ? (
                <div>
                    <p>Благодарим за оценку!</p>
                    <p>{`Вы оценили ${product.name} на ${product.rating.overallRating}`}</p> 
                </div>
            )
            :(
            <>
            {userRating > 0 &&  
            <div className="ratingAndComment">
                <Input text={'Оставьте отзыв'} onChange = {(e) => setComment(e.target.value)}/>
                <Button onClick={addRating}>Отправить</Button>
            </div>}
            </>
             
            )}
            
        </div>
    )
}
export const Rating = styled(RatingContainer)`
margin-top: 30px;
.ratingAndComment{
    display: flex;
    align-items: start;
    gap: 10px;
}

`