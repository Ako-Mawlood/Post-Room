"use client";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
export interface testValue {
  reset: () => void;
}
const Test = ({}, ref: Ref<testValue>) => {
  const [count, setCount] = useState(5);
  function reset() {
    setCount(0);
  }
  useImperativeHandle(ref, () => ({ reset }));
  return <div>{count}</div>;
};

export default forwardRef(Test);
