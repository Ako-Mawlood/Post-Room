"use client";

import { useState, useEffect } from "react";
import { sliderContext } from "../Hooks/useSliderContext";
import { sliderContextValuesType } from "../Types/sliderContextValuesType";

interface sliderProps {
  indexRange: number;
  children: React.ReactNode
}

const Slider = ({ indexRange, children }: sliderProps) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOnFocus, setIsOnFocus] = useState(false);

  //Changeing sliderIndex index every 3.5s. 
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex: number) => (prevIndex + 1) % indexRange);
    }, 3500);
    if (isOnFocus) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnFocus]);

  const sliderContextValues: sliderContextValuesType = {
    isOnFocus,
    sliderIndex,
    setSliderIndex,
    setIsOnFocus,
  };

  return (
    <sliderContext.Provider value={sliderContextValues}>
      {children}
    </sliderContext.Provider>
  );
};

export default Slider;
