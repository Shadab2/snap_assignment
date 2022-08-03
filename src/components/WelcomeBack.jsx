import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/exports";
import { closeModal, setSignOut } from "../redux/userSlice";
import { selectUser } from "../redux/userSlice";
import { auth } from "../firebase.util";

import FormInput from "./FormInput";
import CustomSnack from "./CustomSnack";
import Back from "./Back";

function WelcomeBack({ setMode }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Logged In Sucessfully");

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const signIn = async () => {
    if (user.isLoggedIn) {
      dispatch(closeModal());
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(user.email, password);
      setMessage("Logged in successfully");
      setOpen((prev) => !prev);
    } catch (e) {
      setMessage("Invalid Credentials");
      setError((prev) => !prev);
    }
  };

  const logOut = async () => {
    dispatch(setSignOut());
    setMessage("Logged Out Successfully");
    handleOpen();
    setTimeout(() => {
      setMode(1);
    }, 1500);
  };
  return (
    <div className="bg-white flex-1 relative ">
      <Back />
      {user.isLoggedIn && (
        <div
          className="font-light bg-blueBg text-white px-5 py-2 absolute bottom-10 right-0 md:top-10 md:bottom-auto cursor-pointer"
          onClick={logOut}
        >
          Sign Out
        </div>
      )}
      <div className=" mt-[20%] md:mt-0 flex flex-col h-[80vh] md:h-full items-center md:justify-center gap-8 px-4 w-[90vw] md:w-[auto]">
        <div className="w-full flex justify-center">
          <h1 className="md:w-[80%] text-gray-700 font-bold  text-2xl md:text-4xl">
            Welcome Back!
          </h1>
        </div>
        <FormInput
          type="email"
          placeholder="Email"
          value={user.email}
          readOnly
        />
        <FormInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-sm"
          onClick={signIn}
        >
          {user.isLoggedIn ? "Done" : "Continue"}
        </button>
        <CustomSnack open={open} setOpen={setOpen} message={message} />
        <CustomSnack open={error} setOpen={setError} message={message} fail />
      </div>
    </div>
  );
}

export default WelcomeBack;
