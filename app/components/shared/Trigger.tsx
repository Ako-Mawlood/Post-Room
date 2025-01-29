"use client";

import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
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
      <div ref={triggerRef} className="mt-10 size-20"></div>
    </>
  );
};

export default Trigger;
