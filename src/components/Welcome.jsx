import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { hasAccount, signInWithGoogle } from "../firebase.util";
import CustomSnack from "./CustomSnack";
import FormInput from "./FormInput";
import { setEmail } from "../redux/userSlice";
import Back from "./Back";

function Welcome({ setMode }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const login = async () => {
    await signInWithGoogle();
    handleOpen();
    setTimeout(() => {
      setMode(4);
    }, 3000);
  };

  const loginWithEmail = async () => {
    const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value === "" || !mail.test(value)) {
      setError((prev) => !prev);
      return;
    }
    try {
      dispatch(setEmail({ email: value }));
      const oldUser = await hasAccount(value);
      if (oldUser) setMode(3);
      else setMode(2);
    } catch (e) {}
  };
  return (
    <div className="bg-white flex-1 md:mt-4">
      <div className="relative flex flex-col items-center h-[80vh] w-[90vw] md:w-[auto] justify-center md:h-full gap-9 px-4 ">
        <Back />
        <div className="w-full flex justify-center">
          <h1 className="w-[80%] text-gray-700 font-bold text-2xl md:text-4xl text-center">
            Welcome to Ureify
          </h1>
        </div>
        <button
          style={{ boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.1)" }}
          className="px-4 py-3 w-[100%] md:w-[80%] flex items-center justify-center  border-[#ECEDEF] rounded-[6px]"
          onClick={login}
        >
          <FcGoogle className="mr-1 md:mr-4 " size={24} />
          Continue with Google
        </button>
        <div className="flex w-[100%] md:w-[80%] items-center justify-between ">
          <div className="h-[2px] w-[40%] bg-[#ECEDEF]"></div>
          <p>Or</p>
          <div className="h-[2px] w-[40%] bg-[#ECEDEF]"></div>
        </div>
        <FormInput
          type="email"
          placeholder="Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-[4px]"
          onClick={loginWithEmail}
        >
          Continue
        </button>
        <p className="text-[12px] font-[400] w-full md:w-[80%] text-center -mt-6 md:-mt-4 text-[#7C7E8C]">
          By proceeding, I agree to{" "}
          <span className="font-[600] text-[#44475B]">{"T&C "}</span>
          and
          <span className="font-[600] text-[#44475B]"> Privacy Policy</span>
        </p>
      </div>
      <CustomSnack
        open={open}
        setOpen={setOpen}
        message="Logged In Succesfully"
      />
      <CustomSnack
        open={error}
        setOpen={() => setError((prev) => !prev)}
        message="Email invalid"
        fail
      />
    </div>
  );
}

export default Welcome;
