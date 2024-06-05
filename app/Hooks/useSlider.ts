"use client"

import { useState, useEffect } from "react";

const useSlider = (indexRange: number) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  // Change sliderIndex every 4 second.
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % indexRange);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliderIndex]);

  return {
    sliderIndex,
  };
};

export default useSlider;
