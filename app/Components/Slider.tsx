"use client";

import { useState, useEffect } from "react";
import { featureContext } from "../Hooks/useFeatureContext";
import { sliderContextValuesType } from "../types/sliderContextValuesType";

const Slider = ({ children }: { children: React.ReactNode }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOnHover, setIsOnHover] = useState(false);
  //Changeing image index every 3.5s. 
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex: number) => (prevIndex + 1) % 4);
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
    <featureContext.Provider value={sliderContextValues}>
      {children}
    </featureContext.Provider>
  );
};

export default Slider;
