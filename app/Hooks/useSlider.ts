"use client";

import { useState, useEffect } from "react";

const useSlider = (indexRange: number) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  // Change sliderIndex every 7 second.
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % indexRange);
    }, 7000);

    return () => clearInterval(interval);
  }, [sliderIndex, indexRange]);

  return {
    sliderIndex,
  };
};

export default useSlider;
