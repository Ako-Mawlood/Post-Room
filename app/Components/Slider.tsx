"use client";

import { useState, useEffect } from "react";
import { sliderContext } from "../Hooks/useSliderContext";
import { sliderContextValuesType } from "../types/sliderContextValuesType";

interface sliderProps {
  indexRange: number;
  children: React.ReactNode
}
const Slider = ({ indexRange, children }: sliderProps) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOnHover, setIsOnHover] = useState(false);
  //Changeing image index every 3.5s. 
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex: number) => (prevIndex + 1) % indexRange);
    }, 3500);
    if (isOnHover) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnHover]);

  const sliderContextValues: sliderContextValuesType = {
    sliderIndex,
    setSliderIndex,
    setIsOnHover,
  };

  return (
    <sliderContext.Provider value={sliderContextValues}>
      {children}
    </sliderContext.Provider>
  );
};

export default Slider;
