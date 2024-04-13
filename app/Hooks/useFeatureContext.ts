import { createContext, useContext } from "react";
import { sliderContextValuesType } from "../types/sliderContextValuesType";

export const featureContext = createContext<sliderContextValuesType | undefined>(undefined)

const useFeatureContext = () => {
    const contextValues = useContext(featureContext)

    if (!contextValues) throw new Error("something went wrong while working with useContext")
    return contextValues
}

export default useFeatureContext;