import axios from "axios";
import { server } from "../../server";

export const createProduct = (ProductData) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = await axios.post(
      `${server}/product/create-product`,
      ProductData,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product, //receives the product coming from the backend on request
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};
