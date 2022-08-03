import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/userSlice";

function Back() {
  const dispatch = useDispatch();
  return (
    <div
      className="md:hidden absolute w-10 h-10 top-3 right-0 text-gray-900 cursor-pointer"
      onClick={() => dispatch(closeModal())}
    >
      <AiOutlineClose />
    </div>
  );
}

export default Back;
