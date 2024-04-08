"use client";
import { useRef } from "react";
import Test from "./Components/Test";
import { testValue } from "./Components/Test";
const Home = () => {
  const counterRef = useRef<testValue>(null);
  return (
    <div className={` bg-cover bg-center  h-screen w-screen bg-slate-700`}>
      <Test ref={counterRef} />
      <button
        onClick={() => {
          counterRef.current?.reset();
        }}
      >
        reset{" "}
      </button>
    </div>
  );
};

export default Home;
