import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProducts from "../components/products/SuggestedProducts";

const ProductsDetailsPage = () => {
  const { name } = useParams(); //gets the name of the product from the searh params
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " "); //removes every - in the name in order to use it to find the product in the database

  useEffect(() => {
    const Product = productData.find((product) => product.name === productName);
    setData(Product);
    window.scrollTo(0, 0);
  }, [productName]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default ProductsDetailsPage;
