import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const ProfileSideBar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  //log out function
  const handleLogOut = async () => {
    axios
      .get(`${server}/user/logout`, {
        withCredentials: true,
        /**allows to send the cookies without this the
         *  cookies will not be cleared from the browser
         *  and the log out function will not work properly */
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#3957db" : ""}
        />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 5 ? "#3957db" : ""}
        />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(9)}
      >
        <AiOutlineCreditCard size={20} color={active === 9 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 9 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Payment Methods
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>
      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "#3957db" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[#3957db]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8 hover:text-[#3957db]"
        onClick={() => handleLogOut()}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#3957db" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[#3957db]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
