import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../firebase.util";
import CustomSnack from "./CustomSnack";
import FormInput from "./FormInput";
import { setEmail } from "../redux/userSlice";

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

  const loginWithEmail = () => {
    const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value === "" || !mail.test(value)) {
      setError((prev) => !prev);
      return;
    }
    dispatch(setEmail({ email: value }));
    setMode(2);
  };
  return (
    <div className="bg-white flex-1 md:min-w-[400px]">
      <div className="m-[10%] md:m-[16%] flex flex-col items-center  gap-10">
        <div className="w-full flex justify-center">
          <h1 className="w-[80%] text-gray-700 font-bold text-4xl">
            Welcome to Ureify
          </h1>
        </div>
        <button
          className="px-4 py-3 shadow-md w-[100%] md:w-[80%] flex items-center justify-center border border-[#ECEDEF] rounded-sm"
          onClick={login}
        >
          <FcGoogle className="mr-1 md:mr-4 " size={24} />
          Continue with Google
        </button>
        <div className="flex w-[100%] md:w-[80%] items-center justify-between">
          <div className="h-[2px] w-[45%] bg-[#ECEDEF]"></div>
          <p>Or</p>
          <div className="h-[2px] w-[45%] bg-[#ECEDEF]"></div>
        </div>
        <FormInput
          type="email"
          placeholder="Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-sm"
          onClick={loginWithEmail}
        >
          Continue
        </button>
        <p className="text-[12px] font-light w-[80%] text-center -mt-4">
          By proceeding, I agree to <strong>{"T&C "}</strong>
          and
          <strong> Privacy Policy</strong>
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
