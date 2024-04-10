/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const imgRef = useRef(null);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  //function to zoom out the part of the picture the mouse is on
  const handleMouseMove = (event) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    img.style.transformOrigin = `${x * 100}% ${y * 100}%`; // Set the zoom origin based on mouse position
    img.style.transform = "scale(2)"; // Zoom in by scaling the image
  };
  //function to cancel the zoom on mouse exit
  const handleMouseLeave = () => {
    const img = imgRef.current;
    img.style.transform = "none";
  };

  const handleImageSelect = (index) => {
    setSelect(index);
    const img = imgRef.current;
    img.style.transform = "none";
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/** */}
              <div className="w-full 800px:w-[50%] pt-5">
                <div className="overflow-hidden relative hover:cursor-zoom-in">
                  <img
                    ref={imgRef}
                    src={data && data.image_Url[select].url}
                    alt="Product image"
                    className="w-[70%] h-[50%]"
                    style={{ transform: "scale(1)" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                  <div className="absolute inset-0 border border-gray-300 hidden"></div>
                </div>
                <div className="w-[90%] flex pt-5 ">
                  {data &&
                    data.image_Url.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index
                            ? "border border-[#3957db] rounded-lg shadow-lg"
                            : "null"
                        } cursor-pointer p-2 md:p-5 pl-2 md:pl-5 flex items-center justify-center`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="overflow-hidden mr-3 mt-2 md:mt-5 h-[150px] md:h-[200px] w-[150px] md:w-[200px]"
                          onClick={() => handleImageSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h3 className={`${styles.productDiscountPrice} ml-3`}>
                    {data.discount_price ? data.discount_price + "$" : null}
                  </h3>
                  <h4 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h4>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  {/**Add to wishlist button */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => removeFromWishlistHandler(data)}
                        onClick={() => setClick(!click)}
                        color="#3321c8"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => addToWishlistHandler(data)}
                        onClick={() => setClick(!click)}
                        color="#3321c8"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                {/**Add to cart */}
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center bg-[#3957db]`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pt-1 pb-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-5 text-[15px]">
                      ({data.shop.ratings}) Rating
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#3957db] hover:bg-[#3957fd] mt-4 rounded h-11`}
                  >
                    <span className="text-white flex items-center ">
                      Send Message <AiOutlineMessage className="ml-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
        </div>
        <div className="relative">
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
        </div>
        <div className="relative">
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
        </div>
      </div>
      <div>
        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </>
        ) : null}
        {active === 2 ? (
          <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            <div className="w-full flex justify-center">
              <h5>No Reviews have for this product!</h5>
            </div>
          </div>
        ) : null}
        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center">
                  <img
                    src={`${data?.shop.shop_avatar?.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-2 text-[15px]">
                      {/* ({averageRating}/5) ||5 Ratings */}({" "}
                      {data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:{" "}
                  <span className="font-[500]">
                    {/* {products && products.length} */}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews:{" "}
                  {/* <span className="font-[500]">{totalReviewsLength}</span> */}
                </h5>
                <Link to="/">
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 bg-[#3957db]`}
                  >
                    <h4 className="text-white flex">
                      Visit Shop
                      <FiArrowUpRight />
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetails;
