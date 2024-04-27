"use client";

import clsx from "clsx";

interface switchSliderBtnProps {
  switchIndex: number;
  sliderIndex: number;
  setSliderIndex: React.Dispatch<React.SetStateAction<number>>
  setIsOnFocus: React.Dispatch<React.SetStateAction<boolean>>
  defaultStyle?: string;
  onFocusStyle?: string;
  children?: React.ReactNode;
  handleOnClick?: () => void;
  handleOnMouseEnter?: () => void;
  handleOnMouseLeave?: () => void;
}

const SwitchSliderBtn = ({
  switchIndex,
  sliderIndex,
  setSliderIndex,
  setIsOnFocus,
  defaultStyle = "",
  onFocusStyle = "",
  handleOnClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
  children
}: switchSliderBtnProps) => {

  //Checking if a function provided through props , if not excute a default function.

  const onClick = () => {
    if (handleOnClick) {
      handleOnClick()
    } else {
      setSliderIndex(switchIndex)
      setIsOnFocus(true)
    }
  }
  const onMouseEnter = () => {
    if (handleOnMouseEnter) {
      handleOnMouseEnter()
    } else {
      setIsOnFocus(true)
      setSliderIndex(switchIndex)
    }
  }
  const onMouseLeave = () => {
    if (handleOnMouseLeave) {
      handleOnMouseLeave()
    } else {
      setIsOnFocus(false)
    }
  }

  return (
    <button
      className={clsx("duration-200", {
        [onFocusStyle]: sliderIndex == switchIndex,
        [defaultStyle]: sliderIndex != switchIndex,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default SwitchSliderBtn;
