"use client";
import { GoDotFill } from "react-icons/go";
import useFeatureContext from "../Hooks/useFeatureContext";

const SwitchFeatureBtn = ({ switchIndex }: { switchIndex: number }) => {
  const { setIsOnHover, sliderIndex, setSliderIndex } = useFeatureContext();

  return (
    <button
      onMouseEnter={() => {
        setIsOnHover(true);
        setSliderIndex(switchIndex);
      }}
      onMouseLeave={() => {
        setIsOnHover(false);
      }}
    >
      <GoDotFill size={sliderIndex === switchIndex ? 20 : 7} />
    </button>
  );
};

export default SwitchFeatureBtn;
