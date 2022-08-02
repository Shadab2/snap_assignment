import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/exports";
import { setSignOut } from "../redux/userSlice";
import { selectUser } from "../redux/userSlice";

import FormInput from "./FormInput";
import CustomSnack from "./CustomSnack";
import { updateMobile } from "../firebase.util";

function Details({ setMode }) {
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
    handleOpen();
    setTimeout(() => {
      setMode(1);
    }, 1500);
  };

  const update = async () => {
    if (user.mobileNo) return;
    await updateMobile(user.id, value);
    handleOpen((prev) => !prev);
  };
  return (
    <div className="bg-white flex-1 md:min-w-[400px] relative">
      <div
        className="font-light bg-blueBg text-white px-5 py-2 absolute bottom-20 right-0 md:top-10 md:bottom-auto cursor-pointer"
        onClick={logOut}
      >
        Sign Out
      </div>
      <div className=" m-[10%] md:m-[16%] my-[20%] flex flex-col items-center  gap-10">
        <div className="w-full flex justify-center">
          <h1 className="w-[80%] text-gray-700 font-bold text-4xl">
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
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-sm"
          onClick={update}
        >
          {user.isLoggedIn ? "Logged IN" : "Done"}
        </button>
        <CustomSnack
          open={open}
          setOpen={setOpen}
          message={"Log Out Sucessfully"}
        />
      </div>
    </div>
  );
}

export default Details;
