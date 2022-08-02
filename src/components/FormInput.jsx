import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

function FormInput({ type, isMobile, ...otherProps }) {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "text") setPasswordType("password");
    else setPasswordType("text");
  };
  return (
    <div className="px-4 py-3 w-[100%] md:w-[80%] flex justify-center relative border border-[#a6a5a5] rounded-m">
      {isMobile && (
        <div className="flex items-center ">
          <p className="mr-1">+91</p>
          <IoIosArrowDown />
          <div className="w-[1px] h-4 ml-2 mr-3 bg-[#a6a5a5]"></div>
        </div>
      )}
      <input
        type={type === "password" ? passwordType : type}
        {...otherProps}
        className="w-[100%] placeholder:font-light placeholder:text-gray-400 outline-none focus:outline-none "
      />
      {type === "password" && (
        <span
          className="absolute right-[20px] top-[35%] cursor-pointer "
          onClick={togglePassword}
        >
          {passwordType === "password" ? (
            <AiFillEye color="gray" />
          ) : (
            <AiFillEyeInvisible color="gray" />
          )}
        </span>
      )}
    </div>
  );
}

export default FormInput;
