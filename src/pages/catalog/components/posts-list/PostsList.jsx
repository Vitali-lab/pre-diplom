import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Loader from "../../../../components/loader/Loader";
import { ProductCard } from "../../../../components/product-card/ProductCard";

const PostsListContainer = ({ className, products }) => {
  const [openSizesId, setOpenSizesId] = useState(null);
  const [activeButton, setActiveButton] = useState("");

  if (!products) {
    return <Loader />;
  }

  return (
    <div className={className}>
      {Array.isArray(products) && (
        <AnimatePresence>
          {products.map((post) => (
            <ProductCard
              key={post.id}
              post={post}
              openSizesId={openSizesId}
              setOpenSizesId={setOpenSizesId}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export const PostsList = styled(PostsListContainer)`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 34px;
  margin: 0 0 0 50px;
  padding: 10px 0 0px;

  & i {
    cursor: pointer;
  }

  & i:active {
    transition: all ease 0.2s;
    transform: scale(0.7);
  }

  & .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  @media (max-width: 1440px) {
    gap: 10px;
  }
  @media (max-width: 1600px) {
    gap: 30px;
    margin-left: 60px;
    & .filter-card {
      padding: 60px;
    }
  }

  @media (max-width: 1440px) {
    & .filter-card {
      padding: 60px;
      margin-left: 80px;
    }
  }
`;
