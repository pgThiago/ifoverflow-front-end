"use client";

import { Hamburguer } from "@/components/hamburguer";
import { useAuthStore } from "@/zustand/useAuthStore";
import Link from "next/link";
import { CaretDown, MagnifyingGlass, Power } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { AvatarByName } from "../AvatarByName";
import { Logo } from "../Logo";
import { AuthenticatedDropDown } from "./authenticatedDropDown";
import { UnauthenticatedDropDown } from "./unauthenticatedDropDown";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const [hamburguerIsActive, setHamburguerIsActive] = useState(false),
    [showSearchInput, setShowSearchInput] = useState(false),
    [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleHamburguer = () => {
    setHamburguerIsActive(!hamburguerIsActive);
  };

  const toggleShowSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const ref: any = useRef();
  useEffect(() => {
    if (isClient) {
      const checkIfClickedOutside = (e: any) => {
        if (ref.current && !ref.current?.contains(e.target)) {
          setShowUserInfo(false);
        }
      };
      document.addEventListener("click", checkIfClickedOutside);
      return () => {
        document.removeEventListener("click", checkIfClickedOutside);
      };
    }
  }, [showUserInfo, isClient]);

  return (
    <header className="w-full px-4 bg-black grid grid-rows-1 grid-cols-3 shadow-2xl shadow-sky-900  items-center py-6 text-neutral-900">
      <div className="col-span-1 flex justify-self-start">
        <Hamburguer
          toggleHamburguer={toggleHamburguer}
          hamburguerIsActive={hamburguerIsActive}
        />
        {hamburguerIsActive && isAuthenticated && (
          <AuthenticatedDropDown
            email={user?.email!}
            toggleHamburguer={toggleHamburguer}
          />
        )}
        {hamburguerIsActive && !isAuthenticated && (
          <UnauthenticatedDropDown toggleHamburguer={toggleHamburguer} />
        )}
      </div>

      <Logo />

      <section className={`flex col-span-1 justify-end`}>
        {isAuthenticated && (
          <div className="flex relative">
            <button
              onClick={() => setShowUserInfo(true)}
              className="flex items-center justify-between hover:cursor-pointer"
            >
              <AvatarByName
                color="#fff"
                fgColor="#000"
                size="24"
                className="mr-2 rounded-full"
                name={user?.name}
                maxInitials={2}
              />
              <div className={`flex text-xs mr-1 text-white`}>
                <span className="mr-1">Olá,</span>
                <strong>{user?.name.split(" ")[0]}</strong>
              </div>

              <CaretDown color="#fff" size={16} weight="regular" />
            </button>

            {showUserInfo && (
              <div
                ref={ref}
                className="flex flex-col text-xs bg-white text-neutral-900 absolute top-6 right-2 pl-2 pr-8 py-4  rounded-xl shadow-2xl"
              >
                <span className="font-semibold">{user?.name}</span>
                <span className="font-semibold">{user?.email}</span>
                <Link className="mt-2 font-semibold" href="/dashboard/profile">
                  Minhas perguntas
                </Link>
                <div className="flex items-center justify-start mt-4 hover:scale-105 rounded-sm">
                  <Power size={16} color="red" />
                  <Link
                    href="/"
                    onClick={logout}
                    className="ml-2 font-semibold"
                  >
                    Sair
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </header>
  );
};
