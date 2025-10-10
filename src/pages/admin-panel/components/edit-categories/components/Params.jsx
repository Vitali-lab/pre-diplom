import { Icon } from "../../../../../components/icon/Icon";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ParamsContainer = ({className ,params, deleteFunc}) => {

    const dispatch = useDispatch();

    return (
        <div className={className}>
 {params.map((param) => {
     return(
         <div className="category" key={param.id}>
              <p>{param.name}</p>
              <Icon id="trash" onClick={() => dispatch(deleteFunc(param.id))}/>
              <Icon id = "edit"/>
          </div>
     )
 })}
   </div>

    )
}

export const Params = styled(ParamsContainer)`
width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 10px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 20px 10px;
  & .category{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    gap: 20px;
    margin: 10px 0 0 0;
    border-bottom: 1px solid #ccccccff;
    
    & p{
        width: 200px;
    }
}      
`