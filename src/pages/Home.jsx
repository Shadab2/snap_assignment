import React, { useState } from "react";
import { useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase.util";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { SiTimescale, SiRobotframework } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import Welcome from "../components/Welcome";
import { reset, setUserLoginCredentials } from "../redux/userSlice";
import JoinUR from "../components/JoinUR";
import WelcomeBack from "../components/WelcomeBack";
import Details from "../components/Details";

function Home() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);

  const setUser = ({ displayName, email, photoURL, id, mobileNo }) => {
    dispatch(
      setUserLoginCredentials({
        displayName,
        email,
        photoURL,
        id,
        mobileNo,
      })
    );
  };

  useEffect(() => {
    const unsubFromAuth = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userRef = await createUserProfileDocument(user);
          userRef.onSnapshot((snapshot) => {
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
        } else dispatch(reset());
      } catch (e) {
        console.log(e);
      }
    });
    return () => unsubFromAuth;
  }, []);

  return (
    <div className="w-screen h-screen flex bg-white flex-wrap overflow-hidden ">
      <div className="hidden md:block flex-1 bg-blueBg text-white relative">
        <div className="m-[16%] min-w-[400px]">
          <h1 className="text-4xl font-bold my-8">
            Create a resume that gets 3x Interview Calls
          </h1>
          <ul className="flex flex-col gap-10">
            <li className="flex items-center justify-center">
              <SiTimescale size={32} />
              <p className="text-md font-light ml-4">
                Save time with ATS friendly templates and pre-written examples
                for 10,000+ job titles
              </p>
            </li>
            <li className="flex items-center justify-center">
              <SiRobotframework size={32} />
              <p className="text-md font-light ml-4">
                Use AI to improve your resume score in minutes and stand out
                from the competition
              </p>
            </li>
            <li className="flex items-center justify-center">
              <BsClipboardData size={32} />
              <p className="text-md font-light ml-4">
                Customise your resume for every JD in just a few clicks to
                maximise interview chances
              </p>
            </li>
          </ul>
        </div>
        <ul className="list-disc flex gap-8  w-[100%] absolute bottom-[15%] justify-center">
          <li>No credit card required </li>
          <li>Download your resume free</li>
        </ul>
      </div>
      {mode === 1 && <Welcome setMode={setMode} />}
      {mode === 2 && <JoinUR setMode={setMode} />}
      {mode === 3 && <WelcomeBack setMode={setMode} />}
      {mode === 4 && <Details setMode={setMode} />}
    </div>
  );
}

export default Home;
