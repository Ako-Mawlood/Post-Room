"use client";
import { GoDotFill } from "react-icons/go";
import useFeatureContext from "../Hooks/useFeatureContext";
import clsx from "clsx";

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
      <GoDotFill
        className={clsx("duration-200", {
          "w-[20px] h-[20px]": sliderIndex == switchIndex,
          "w-[7px] h-[7px]": sliderIndex != switchIndex,
        })}
      />
    </button>
  );
};

export default SwitchFeatureBtn;
