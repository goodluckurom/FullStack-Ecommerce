/* eslint-disable react/prop-types */
import styles from "../../styles/styles";
import { IoGift } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const Wishlist = ({ setOpenWishlist }) => {
  const wishListData = [
    {
      name: "Iphone 14pro max 256gb ssd and 8gb ram silver colour",
      description: "test",
      price: "999",
    },
    {
      name: "Iphone 14pro max 256gb ssd and 8gb ram silver colour",
      description: "test",
      price: "469",
    },
    {
      name: "Iphone 14pro max 256gb ssd and 8gb ram silver colour",
      description: "test",
      price: "469",
    },
    {
      name: "Iphone 14pro max 256gb ssd and 8gb ram silver colour",
      description: "test",
      price: "469",
    },
    {
      name: "Iphone 15 pro max 256gb ssd and 8gb ram silver colour",
      description: "test",
      price: "879",
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[40%] bg-white flex flex-col justify-between shadow-sm">
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              color="#3957db"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/**item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoGift size={25} color="#3957db" />
            <h5 className="pl-2 text-[20px] font-[500]">
              <span className="text-[#3957db]">3</span> items
            </h5>
          </div>
        </div>
        {/**wishlist single item */}
        <br />
        <div className="w-full border-t">
          {wishListData &&
            wishListData.map((i, index) => (
              <WishListSingle data={i} key={index} />
            ))}
        </div>
        <br />
      </div>
    </div>
  );
};

const WishListSingle = ({ data }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          color="#3957db"
        />
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${data.price}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={25}
            className="cursor-pointer"
            tile="Add to cart"
            color="#3957db"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
