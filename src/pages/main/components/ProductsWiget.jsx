import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const cardVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.4 } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  },
};

const ProductsWigetContainer = ({ className }) => {
  const products = useSelector((state) => state.products.products);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const paginatedProducts = products.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  const variants = ["fadeInUp", "fadeInLeft", "fadeInRight", "zoomIn"];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            display: "flex",
            gap: "80px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {paginatedProducts.map((p, i) => (
            <motion.img
              key={p.id}
              src={p.images[0]}
              alt={p.name}
              variants={cardVariants[variants[i % variants.length]]}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/catalog/${p.id}`)}
              style={{
                width: "100%",
                height: "350px",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const ProductsWiget = styled(ProductsWigetContainer)`
  width: 100%;
`;
