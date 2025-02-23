//add to cart action
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });
  //to update the local storage with the new cart items
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

//remove from cart action
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  //to update the local storage with the new cart items
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
