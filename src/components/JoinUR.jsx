import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux/es/exports";
import { auth, createUserProfileDocument, hasAccount } from "../firebase.util";
import FormInput from "./FormInput";
import CustomSnack from "./CustomSnack";

function JoinUR({ setMode }) {
  const { email } = useSelector(selectUser);

  const [state, setState] = useState({
    displayName: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signUpWithEmail = async () => {
    const { password, confirmPassword, displayName, mobileNo } = state;
    const mobileReg = /^[0-9]{10}$/;
    if (
      password.length < 4 ||
      displayName.length < 3 ||
      password !== confirmPassword ||
      !mobileReg.test(mobileNo)
    ) {
      setError((prev) => !prev);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setSuccess((prev) => !prev);
      await createUserProfileDocument(user, { displayName, mobileNo });
      setMode(3);
    } catch (e) {
      console.log(e);
      setError((prev) => !prev);
    }
  };

  useEffect(() => {
    async function get() {
      const user = await hasAccount(email);
      if (user) {
        setMode(3);
      }
    }
    get();
  }, []);
  return (
    <div className="bg-white flex-1 md:min-w-[400px]">
      <div className="m-[10%] md:m-[16%] flex flex-col items-center  gap-10">
        <div className="w-[80%] flex flex-col gap-1 -mb-[10px] justify-center">
          <h1 className=" text-gray-700 font-bold text-4xl">Join Ureify</h1>
          <span className="text-[rgba(33, 37, 41, 0.7)] font-light text-sm md:text-base">
            Your email :
            <span className="text-[#FB5607] font-medium">{email}</span>
          </span>
        </div>
        <FormInput
          name="displayName"
          type="text"
          placeholder="Enter  your name"
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="mobileNo"
          placeholder="Enter your mobile number"
          onChange={handleChange}
          isMobile
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
        />
        <button
          className="w-[100%] md:w-[80%] bg-blueBg px-4 py-3 border-none text-white font-semibold rounded-sm"
          onClick={signUpWithEmail}
        >
          Continue
        </button>
      </div>
      <CustomSnack
        open={success}
        setOpen={() => setSuccess((prev) => !prev)}
        message="User Succesfully created"
      />
      <CustomSnack
        open={error}
        setOpen={() => setError((prev) => !prev)}
        message="Kindly fill valid  details"
        fail
      />
    </div>
  );
}

export default JoinUR;
