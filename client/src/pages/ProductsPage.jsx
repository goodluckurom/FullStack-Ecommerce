import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Route/Footer/Footer";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData === null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoryData);
      setData(d);
    }
    window.scrollTo(0, 0); //scrolls the page to the begining of the pagw
  }, [categoryData]);
  return (
    <>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section} mb-5`}>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {data.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
        {data.length === 0 && (
          <h2 className="text-center w-full pb-[100px] text-[20px] font-[600]">
            No products found in this category
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
