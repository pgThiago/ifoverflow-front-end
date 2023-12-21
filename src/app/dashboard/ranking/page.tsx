"use client";

import { AvatarByName } from "@/components/AvatarByName";
import { useService } from "@/services";
import { RankingUserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const Ranking = () => {
  const { getRanking } = useService();

  const { data } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRanking,
  });

  return (
    <main>
      {data && (
        <>
          <Podium data={data} />
          <RankingGrid data={data} />
        </>
      )}
    </main>
  );
};

export default Ranking;

interface PodiumProps {
  data: RankingUserType[];
}

interface RankingGridProps extends PodiumProps {}

const Card = ({ user, i }: { user: RankingUserType; i: number }) => {
  return (
    <div
      className={`${i === 0 ? "mt-16" : ""} ${
        i === 2 ? "mt-32" : ""
      } shadow-2xl shadow-sky-900 rounded-md p-2 md:p-4`}
    >
      <div className="flex justify-between mb-8 border-b-2 pb-4">
        {(() => {
          if (i === 0 || i === 1 || i === 2) {
            return (
              <>
                <div className="font-semibold">
                  <span className="bg-black text-white p-2 text-sm rounded-full mr-2">
                    {i === 1 && "#1"}
                    {i === 0 && "#2"}
                    {i === 2 && "#3"}
                  </span>
                  {i === 1 && "Primeiro lugar"}
                  {i === 0 && "Segundo lugar"}
                  {i === 2 && "Terceiro lugar"}
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
            size="40"
            className="rounded-full mr-2"
            name={user?.name}
            maxInitials={2}
          />
        </div>

        <div className="flex flex-col ml-4">
          <span className="">{user.name}</span>
          <span className="text-black font-bold">
            {user.name.split(" ")[1]}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
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

const Podium = ({ data }: PodiumProps) => {
  const [tops, setTops] = useState<RankingUserType[]>([]);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (!hasUpdated) {
      setHasUpdated(true);

      const newTops = data.slice(0, 3).map((user, index) => {
        if (index === 0) {
          const aux = data[index];
          data[index] = data[1];
          data[1] = aux;
        }
        return user;
      });

      setTops(newTops);
    }
  }, [data, hasUpdated]);

  return (
    <>
      <h4 className="text-black font-semibold mx-auto rounded-lg bg-white w-fit px-4 py-2">
        Ranking
      </h4>
      <div className="flex gap-2 p-2 items-start justify-center md:gap-8 py-2 my-8">
        {tops.map((user, i) => (
          <Card key={i} i={i} user={user} />
        ))}
      </div>
    </>
  );
};

const RankingGrid = ({ data }: RankingGridProps) => {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 py-2 border-t-2 my-8">
      {data.map((user, i) => {
        if (i > 2) {
          return <Card key={i} user={user} i={i} />;
        }
      })}
    </div>
  );
};
