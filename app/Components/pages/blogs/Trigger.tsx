"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface TriggerProps {
  skip: number;
}

const Trigger: React.FC<TriggerProps> = ({ skip }) => {
  const router = useRouter();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setHasLoaded(true); // Prevent further triggers until data is loaded
            router.push(`/blogs?skip=${skip + 10}`, {
              scroll: false,
            });
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
  }, [router, skip, hasLoaded]);

  return (
    <div ref={triggerRef} className="mx-auto my-4">
      Loading...
    </div>
  );
};

export default Trigger;
