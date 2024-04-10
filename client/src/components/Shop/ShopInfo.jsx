/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  console.log("seller:", seller);
  //log out function
  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        // navigate(`/shop/:${seller._id}`);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={seller.avatar?.url}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{seller.shop_name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {seller.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{seller.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">15</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Rating</h5>
        <h4 className="text-[#000000a6]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3321c8]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3321c8]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopInfo;
