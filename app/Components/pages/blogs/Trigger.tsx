"use client";

import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { ImSpinner8 as Spinner } from "react-icons/im";
type triggerPropsType = {
  setSkip: Dispatch<SetStateAction<number>>;
};

const Trigger = ({ setSkip }: triggerPropsType) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    const currentRef = triggerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setSkip((prevSkip) => prevSkip + 10);
      setIsIntersecting(false);
    }
  }, [isIntersecting, setSkip]);

  return (
    <>
      <div
        ref={triggerRef}
        className="absolute bottom-[99vh] left-1/2 mx-auto mb-20 mt-10 text-5xl"
      ></div>
      <Spinner className="mx-auto my-10 animate-spin text-center" />
    </>
  );
};

export default Trigger;
