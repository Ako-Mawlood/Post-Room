import React from "react";

export interface sliderContextValuesType {
    setIsOnHover: React.Dispatch<React.SetStateAction<boolean>>
    sliderIndex: number,
    setSliderIndex: React.Dispatch<React.SetStateAction<number>>

}

