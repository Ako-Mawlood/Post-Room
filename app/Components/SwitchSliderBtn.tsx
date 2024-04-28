"use client";

import clsx from "clsx";

interface switchSliderBtnProps {
  switchIndex: number;
  sliderIndex: number;
  defaultStyle?: string;
  onFocusStyle?: string;
  handleClick?: () => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  children?: React.ReactNode;
}

const SwitchSliderBtn = ({
  switchIndex,
  sliderIndex,
  defaultStyle = "",
  onFocusStyle = "",
  handleClick = () => { },
  handleMouseEnter = () => { },
  handleMouseLeave = () => { },
  children
}: switchSliderBtnProps) => {

  return (
    <button
      className={clsx("duration-200", {
        [onFocusStyle]: sliderIndex == switchIndex,
        [defaultStyle]: sliderIndex != switchIndex,
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default SwitchSliderBtn;
