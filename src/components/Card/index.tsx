"use client";

import { RankingUserType } from "@/types";
import Image from "next/image";
import { AvatarByName } from "../AvatarByName";

export const Card = ({ user, i }: { user: RankingUserType; i: number }) => {
  return (
    <div
      className={`${i === 0 ? "mt-16" : ""} ${
        i === 2 ? "mt-32" : ""
      } shadow-2xl shadow-sky-900 rounded-md p-2 md:p-4`}
    >
      <div className="flex justify-between mb-2 md:mb-4 border-b-2 pb-4">
        {(() => {
          if (i === 0 || i === 1 || i === 2) {
            return (
              <>
                <div className="font-semibold text-xs md:text-sm">
                  <span className="bg-black text-white p-2 rounded-full mr-2">
                    {i === 1 && "#1"}
                    {i === 0 && "#2"}
                    {i === 2 && "#3"}
                  </span>
                  {i === 1 && "Primeiro"}
                  {i === 0 && "Segundo"}
                  {i === 2 && "Terceiro"}
                </div>
                {i === 1 && (
                  <Image
                    src={"/1st.png"}
                    alt="posição"
                    width={20}
                    height={20}
                  />
                )}
                {i === 0 && (
                  <Image
                    src={"/2nd.png"}
                    alt="posição"
                    width={20}
                    height={20}
                  />
                )}
                {i === 2 && (
                  <Image
                    src={"/3rd.png"}
                    alt="posição"
                    width={20}
                    height={20}
                  />
                )}
              </>
            );
          }
        })()}
      </div>
      <div className="mb-2 w-full flex">
        <div>
          <AvatarByName
            color="#000"
            fgColor="#fff"
            size="20"
            className="rounded-full mr-2 text-xs"
            name={user?.name}
            maxInitials={2}
          />
        </div>

        <div className="flex flex-col ml-2 md:ml-4 text-xs md:text-sm">
          <span className="">{user.name}</span>
          <span className="text-black font-bold">
            {user.name.split(" ")[1]}
          </span>
        </div>
      </div>
      <div className="flex justify-between text-xs md:text-sm">
        <div className="flex flex-col">
          <span className="text-black">{user.votes}</span>
          <span className="text-black font-bold">votos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black">{user.rating.name}</span>
          <span className="text-black font-bold">
            {user.rating.description}
          </span>
        </div>
      </div>
    </div>
  );
};
