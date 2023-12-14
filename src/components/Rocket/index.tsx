/* eslint-disable react-hooks/exhaustive-deps */
import { scrollUp } from "@/utils/scroll";
import Image from "next/image";
import { Rocket } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

export const RocketLaunch = () => {
  const rocketRef: any = useRef(null);

  const [showRocket, setShowRocket] = useState(false),
    [isOver, setIsOver] = useState(false),
    [isLauching, setIsLauching] = useState(false),
    [scrollY, setScrollY] = useState(window?.scrollY);

  const rocketGoUp = () => {
    scrollUp();
    setIsLauching(true);

    rocketRef?.current?.classList.add("duration-[10000ms]");
    rocketRef?.current?.classList.add("-translate-y-[80rem]");

    const timeout = setTimeout(() => {
      setIsLauching(false);
      rocketRef?.current?.classList.remove("-translate-y-[80rem]");
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY) {
      if (scrollY > 200) {
        setShowRocket(true);
        return;
      }
      if (scrollY < 200 && isLauching === true) {
        setShowRocket(true);
        return;
      }
      if (scrollY < 200 && isLauching === false) {
        setShowRocket(false);
        return;
      }
    }
  }, [scrollY, isLauching]);

  return (
    <button
      onClick={() => {
        rocketGoUp();
      }}
      className={`fixed bottom-1 right-0 z-50 ease-in-out ${
        showRocket ? "flex flex-col items-center" : "hidden"
      }`}
      ref={rocketRef}
      title="Decolar"
    >
      <>
        <Rocket
          color="#64748b"
          size={56}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          weight={`${isOver ? "fill" : "thin"}`}
          className="animate-pulse via-purple-900 "
        />
        🔥
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg"
          width={70}
          height={100}
          alt="This is Elon Musk"
        />
      </>
    </button>
  );
};
