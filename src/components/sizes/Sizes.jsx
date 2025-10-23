
import styled from "styled-components";

const SizesContainer = ({className ,sizesKeys ,product ,activeButton ,setActiveButton}) => {


    return (
        <div className={className}>
           {sizesKeys.map((size, index) => {
                    if (product.sizes[size] !== 0)

                  return (
                    <button className={activeButton === size ? 'active' : 'not-active'} onClick={()=>{setActiveButton(size)}} key={index}>
                      {size}
                    </button >
                  )  
                })}
        </div>
    )
}

export const Sizes = styled(SizesContainer)`
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
gap: 10px;

& .active {
    width: 50px;
     height: 50px;
     border-radius: 0px;
     border: 1px solid #000000ff;
     background-color: black;
     color: #fdfbfbff;
     font-size: 15px;
     cursor: pointer;
     transition: all ease 0.5s;
     
    }

 & .not-active{
     width: 50px;
     height: 50px;
     border-radius: 0px;
     border: 1px solid #000000ff;
     background-color: transparent;
     color: #0f0f0fff;
     font-size: 15px;
     cursor: pointer;
     transition: all ease 0.5s;
     &:hover{
     transition: all ease 0.5s;
         background-color: #000000ff;
         color: #ffffffff;
     }
 }

`