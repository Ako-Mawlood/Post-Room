"use client";

import { useState, useEffect } from "react";

const useSlider = (indexRange: number) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOnFocus, setIsOnFocus] = useState(false);

  //Changeing sliderIndex index every 3s. 
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex: number) => (prevIndex + 1) % indexRange);
    }, 3000);
    if (isOnFocus) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnFocus]);

  return {
    isOnFocus,
    sliderIndex,
    setSliderIndex,
    setIsOnFocus,
  };
};

export default useSlider;
