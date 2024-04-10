import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";
import sellerReducer from "./reducers/seller";
import { productReducer } from "./reducers/product";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    seller: sellerReducer,
    product: productReducer,
  },
});

export default store;
