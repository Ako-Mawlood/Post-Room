"use client";

import { featureConfig } from "@/constants/featureConfig";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const features: HTMLDivElement[] = gsap.utils.toArray(ref.current.children);
    features.forEach((feature) => {
      gsap.from(feature, {
        filter: "blur(3px)",
        scrollTrigger: {
          trigger: feature,
          start: "top 90%",
          end: "bottom top",
          once: true,
          scrub: false,
        },
        ease: "back.in",
      });
    });
  }, []);
  return (
    <section className="flex h-fit flex-col justify-between gap-8 md:flex-row">
      <div className="w-full p-6 md:w-fit">
        <h1 className="sticky left-4 top-[15vh] my-auto font-PT text-6xl leading-none md:text-8xl lg:text-[10rem]">
          A Hub
          <br />
          for your
          <br />
          stories
        </h1>
      </div>
      <div
        ref={ref}
        className="flex max-w-[45rem] flex-grow flex-col gap-10 overflow-hidden md:mt-[30rem]"
      >
        {featureConfig.map((feature, index) => (
          <div key={index} className="relative mt-4 flex flex-col gap-3 p-6">
            <div className="flex w-full items-center justify-between">
              <h1 className="font-PT text-3xl md:text-4xl lg:text-5xl">
                {feature.title}
              </h1>
              <div className="rounded-full border-2 border-black bg-white p-1.5">
                <feature.icon />
              </div>
            </div>

            <p className="md:text-xl">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
