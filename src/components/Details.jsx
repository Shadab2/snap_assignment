import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/exports";
import { setSignOut, closeModal } from "../redux/userSlice";
import { selectUser } from "../redux/userSlice";

import FormInput from "./FormInput";
import CustomSnack from "./CustomSnack";
import { updateMobile } from "../firebase.util";
import Back from "./Back";

function Details({ setMode }) {
  const [message, setMessage] = useState("Logged out succesfully");
  const [error, setError] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(() =>
    user.mobileNo ? user.mobileNo : ""
  );

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const logOut = async () => {
    dispatch(setSignOut());
    setMessage("Logged Out successfully");
    handleOpen();
    setTimeout(() => {
      setMode(1);
    }, 1500);
  };

  const update = async () => {
    if (user.mobileNo) {
      dispatch(closeModal());
    }
    const mobileReg = /^[0-9]{10}$/;
    if (!mobileReg.test(value)) {
      setMessage("Invalid Mobile No");
      setError((prev) => !prev);
      return;
    }
    await updateMobile(user.id, value);
    setMessage("Updated Sucessfully");
    handleOpen((prev) => !prev);
  };
  return (
    <div className="bg-white flex-1 relative">
      <Back />
      <div
        className="font-light bg-blueBg text-white px-5 py-2 absolute bottom-20 right-0 md:top-10 md:bottom-auto cursor-pointer"
        onClick={logOut}
      >
        Sign Out
      </div>
      <div className=" mt-[20%] md:mt-0 flex flex-col w-[90vw] md:w-[auto] items-center  h-[80vh] md:h-full md:justify-center gap-6 md:gap-10 px-4">
        <div className="w-full flex justify-center">
          <h1 className=" hidden md:block w-[80%] text-gray-700 font-bold text-4xl leading-[48px] text-left">
            Enter your <br /> Personal Details
          </h1>
          <h1 className=" md:hidden w-[100%] text-gray-700 font-bold text-2xl text-center">
            Enter your Personal Details
          </h1>
        </div>
        <FormInput
          type="text"
          value={user.displayName}
          placeholder="Enter your name"
          readOnly={user.displayName}
        />
        <FormInput
          type="text"
          placeholder="Enter your mobile no"
          value={user.mobileNo}
          readOnly={user.mobileNo}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-[5px]"
          onClick={update}
        >
          {user.mobileNo === "" ? "Update " : "Done"}
        </button>
        <CustomSnack open={open} setOpen={setOpen} message={message} />
        <CustomSnack open={error} setOpen={setError} message={message} fail />
      </div>
    </div>
  );
}

export default Details;
