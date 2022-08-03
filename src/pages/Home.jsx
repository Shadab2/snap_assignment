import React, { useState } from "react";
import { useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase.util";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { SiTimescale, SiRobotframework } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import Welcome from "../components/Welcome";
import {
  closeModal,
  openModal,
  reset,
  selectUser,
  setUserLoginCredentials,
} from "../redux/userSlice";
import JoinUR from "../components/JoinUR";
import WelcomeBack from "../components/WelcomeBack";
import Details from "../components/Details";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);
  const { modalOpen, isLoggedIn } = useSelector(selectUser);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const handleModalOpen = () => {
    dispatch(openModal());
  };

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
    <div className="h-screen w-screen grid place-content-center">
      <button
        className="px-4 py-2 border-none rounded text-[xl] font-semibold bg-blueBg text-white"
        onClick={handleModalOpen}
      >
        {!isLoggedIn ? "Log In" : "Sign Out"}
      </button>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="grid place-content-center"
      >
        <div
          className="md:w-[900px] md:h-[475px] flex bg-white flex-wrap overflow-hidden outline-none"
          style={{ borderRadius: "11px 10px 10px 10px" }}
        >
          <div className="hidden md:block flex-1 h-[100%] bg-blueBg text-white relative">
            <div className="p-5 pl-12 pr-6 relative">
              <h1 className="text-3xl font-bold my-8">
                Create a resume that
                <br /> gets 3x Interview Calls
              </h1>
              <ul className="flex flex-col gap-8">
                <li className="flex items-center justify-center">
                  <SiTimescale size={42} />
                  <p className="font-light ml-2 ">
                    Save time with ATS friendly templates and pre-written
                    examples for 10,000+ job titles
                  </p>
                </li>
                <li className="flex items-center justify-center">
                  <SiRobotframework size={42} />
                  <p className="font-light ml-2 ">
                    Use AI to improve your resume score in minutes and stand out
                    from the competition
                  </p>
                </li>
                <li className="flex items-center justify-center">
                  <BsClipboardData size={42} />
                  <p className="font-light ml-2 ">
                    Customise your resume for every JD in just a few clicks to
                    maximise interview chances
                  </p>
                </li>
              </ul>
            </div>
            <ul className="list-disc flex gap-10 z-100 w-[100%]  text-sm absolute bottom-[5%] justify-center">
              <li>No credit card required </li>
              <li>Download your resume free</li>
            </ul>
          </div>
          {mode === 1 && <Welcome setMode={setMode} />}
          {mode === 2 && <JoinUR setMode={setMode} />}
          {mode === 3 && <WelcomeBack setMode={setMode} />}
          {mode === 4 && <Details setMode={setMode} />}
        </div>
      </Modal>
    </div>
  );
}

export default Home;
