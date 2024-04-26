"use client";

import useSliderContext from "../../../Hooks/useSliderContext";
import clsx from "clsx";

interface switchSliderBtnProps {
  switchIndex: number;
  defaultStyle?: string;
  onFocusStyle?: string;
  children?: React.ReactNode;
  handleOnClick?: () => void;
  handleOnMouseEnter?: () => void;
  handleOnMouseLeave?: () => void;
}
const SwitchSliderBtn = ({
  switchIndex,
  defaultStyle = "",
  onFocusStyle = "",
  handleOnClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
  children
}: switchSliderBtnProps) => {
  const { setIsOnHover, sliderIndex, setSliderIndex } = useSliderContext();

  const onClick = () => {
    if (handleOnClick) {
      handleOnClick()
    } else {
      setSliderIndex(switchIndex)
    }
  }
  const onMouseEnter = () => {
    if (handleOnMouseEnter) {
      handleOnMouseEnter()
    } else {
      setIsOnHover(true)
      setSliderIndex(switchIndex)
    }
  }
  const onMouseLeave = () => {
    if (handleOnMouseLeave) {
      handleOnMouseLeave()
    } else {
      setIsOnHover(false)
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
