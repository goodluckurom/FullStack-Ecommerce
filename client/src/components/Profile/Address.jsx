import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Address
        </h1>
        <div
          className={`${styles.button} !rounded-md bg-[#3957db] !hover:bg-[##3977ef]`}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h2 className="font-[600]">Default</h2>
          <h5 className="pl-5 font-[600] text-[16px]">
            Angwa Fulani, Primary School, Dakwa
          </h5>
        </div>
        <div className="flex items-center pl-8 text-[18px]">
          <h6>(234) 811-954-5460</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer"
            color="#3957db"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
