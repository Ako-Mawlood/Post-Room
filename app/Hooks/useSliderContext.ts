import { createContext, useContext } from "react";
import { sliderContextValuesType } from "../types/sliderContextValuesType";

export const sliderContext = createContext<sliderContextValuesType | undefined>(undefined)

const useSliderContext = () => {
    const sliderContextValues = useContext(sliderContext)

    if (!sliderContextValues) throw new Error("something went wrong while working with useContext")
    return sliderContextValues
}

export default useSliderContext;