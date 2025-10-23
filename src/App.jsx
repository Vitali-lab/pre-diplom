import { Routes, Route, useLocation } from "react-router-dom";
import { Catalog , Main } from "./pages";
import { Header } from "./components";
import styled from "styled-components";
import { Product } from "./pages/product/Product";
import { AnimatePresence, motion } from "framer-motion";
import { AdminPanel } from "./pages/admin-panel/AdminPanel";
import { useLayoutEffect , useEffect } from "react";
import { getCategories } from "./bff/api/get-categories";
import { getSeasons } from "./bff/api/get-seasons";
import { useDispatch } from "react-redux";
import { Cart } from "./pages/cart/Cart";
import { getProducts } from "./bff/api/get-products";
import { setProducts } from "./actions/set-products";
import { EditProduct } from "./pages/admin-panel/components/edit-product/EditProduct";
import { AddProduct } from "./pages/admin-panel/components/add-product/AddProduct";
import { EditParams } from "./pages/admin-panel/components/edit-categories/EditParams";
import { Registration } from "./components/registration/Regictration";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./pages/favorites/Favorites";
import { Order } from "./pages/order/Order";
import { UserCabinet } from "./pages/user-cabinet/UserCabinet";

const pageVariants = {
  initial: (direction) => ({
    // x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction) => ({
    // x: direction > 0 ? -50 : 50,
    opacity: 0,
  }),
};

const pageTransition = {
  duration: 0.2,
  ease: "easeInOut",
};

const AppContainer = ({ className }) => {



  useLayoutEffect(()=>{
    if(!sessionStorage.getItem('products')){
       sessionStorage.setItem('products', JSON.stringify([])); 
    }


  },[])

const dispatch = useDispatch();
 useEffect(()=>{
    getProducts()(dispatch)
  },[ dispatch])

    useEffect(()=>{
     dispatch(getCategories());
     dispatch(getSeasons());

},[])

   const location = useLocation();

  return (
    <div className={className}>
       <ToastContainer/>
      <Header />
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Main />
                </motion.div>
              }
            />
            <Route
              path="/catalog"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Catalog />
                </motion.div>
              }
            />
            <Route
              path="/catalog/:id"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Product />
                </motion.div>
              }
            />
            <Route
              path="/about-us"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <div>О нас</div>
                </motion.div>
              }
            />
            <Route
              path="/delivery"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <div>Доставка</div>
                </motion.div>
              }
            />
            <Route
              path="/cart"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Cart/>
                </motion.div>
              }
            />
            <Route
              path="/cart/order/:orderId"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Order/>
                </motion.div>
              }
            />
             <Route
              path="/favorites"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Favorites/>
                </motion.div>
              }
            />
            <Route
              path="/user-cabinet/:id"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <UserCabinet/>
                </motion.div>
              }
            />
           
            <Route
              path="/admin-panel"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AdminPanel/>
                </motion.div>
              }
            />
             <Route
              path="/admin-panel/edit-product/:id"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <EditProduct/>
                </motion.div>
              }
            />
            <Route
              path="/admin-panel/add-product/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AddProduct/>
                </motion.div>
              }
            />
             <Route
              path="/admin-panel/edit-params/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <EditParams/>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const App = styled(AppContainer)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 auto;
width: 1700px;
background-color: #ffffffff;
margin-top: 200px;
margin-bottom: 200px;

border-radius: 10px;
-webkit-box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
-moz-box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;

`
