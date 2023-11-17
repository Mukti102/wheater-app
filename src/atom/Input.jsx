import React, { useState } from "react";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showFormattedDate } from "./date";
function Input({ onDataFromInput }) {
  const [input, setInput] = useState("");
  const inputChanget = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onDataFromInput(input);
    setInput("");
  };
  const clear = () => {
    setInput("");
  };

  return (
    <>
      <h1 className="ml-10 pt-6 text-slate-400 text-opacity-80 text-[12px] my-2">
        {showFormattedDate(new Date())}
      </h1>
      <div className="w-[80%] bg-slate-100 justify-between h-16 pb-3 mx-auto rounded-2xl overflow-hidden flex items-center">
        <form
          className="w-[90%]  mt-3 h-full items-center flex overflow-hidden  px-3 "
          onSubmit={handleSubmit}
        >
          <FontAwesomeIcon
            icon={faMapLocationDot}
            className="text-slate-300 text-xl"
          />
          <input
            type="text"
            className="w-full h-full px-2 text-sm placeholder:text-sm outline-none bg-slate-100"
            placeholder="Tulis Kota mu di sini..."
            value={input}
            onChange={inputChanget}
          />
        </form>
        <button
          className={
            "w-5 h-5 mt-3 rounded-full text-slate-400 text-sm text-center" +
            (input.length ? " flex" : " hidden")
          }
          onClick={clear}
        >
          x
        </button>
      </div>
    </>
  );
}

export default Input;
