"use client";

import { AvatarByName } from "@/components/AvatarByName";
import { useService } from "@/services";
import { RankingUserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const Ranking = () => {
  const [screenSize, setScreenSize] = useState({
    width: getCurrentDimension() as unknown as number | 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const updateDimension = () => {
        const dimensions = getCurrentDimension();
        setScreenSize(dimensions);
      };
      window.addEventListener("resize", updateDimension);
      return () => {
        window.removeEventListener("resize", updateDimension);
      };
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const updateDimension = () => {
        const dimensions = getCurrentDimension();
        setScreenSize(dimensions);
      };
      window.addEventListener("resize", updateDimension);
      return () => {
        window.removeEventListener("resize", updateDimension);
      };
    }
  }, [isClient, screenSize]);

  const { getRanking } = useService();

  const { data } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRanking,
  });

  if (isClient) {
    return (
      <main>
        {data && (
          <>
            <Podium data={data} screenSize={screenSize} />
            <RankingGrid data={data} screenSize={screenSize} />
          </>
        )}
      </main>
    );
  }
};

export default Ranking;

interface PodiumProps {
  data: RankingUserType[];
  screenSize: {
    width: number;
  };
}

interface RankingGridProps extends PodiumProps {}

const Card = ({
  user,
  i,
  screenSize,
}: {
  user: RankingUserType;
  i: number;
  screenSize: { width: number };
}) => {
  if (screenSize && screenSize.width > 640) {
    return (
      <div
        className={`${i === 0 ? "mt-16" : ""} ${
          i === 2 ? "mt-32" : ""
        } shadow-2xl shadow-sky-900 rounded-md p-4`}
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
  }

  return (
    <div className={`shadow-2xl shadow-sky-900 rounded-md p-4`}>
      <div className="flex justify-between mb-8 border-b-2 pb-4">
        {(() => {
          if (i === 0 || i === 1 || i === 2) {
            return (
              <>
                <div className="font-semibold">
                  <span className="bg-black text-white p-2 text-sm rounded-full mr-2">
                    {i === 0 && "#1"}
                    {i === 1 && "#2"}
                    {i === 2 && "#3"}
                  </span>
                  {i === 0 && "Primeiro lugar"}
                  {i === 1 && "Segundo lugar"}
                  {i === 2 && "Terceiro lugar"}
                </div>
                {i === 0 && (
                  <Image
                    src={"/1st.png"}
                    alt="posição"
                    width={20}
                    height={20}
                  />
                )}
                {i === 1 && (
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

const Podium = ({ data, screenSize }: PodiumProps) => {
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

  if (screenSize && screenSize.width > 640) {
    return (
      <>
        <h4 className="text-black font-semibold mx-auto rounded-lg bg-white w-fit px-4 py-2">
          Ranking
        </h4>
        <div className="flex gap-4 items-start justify-center md:gap-8 py-2 my-8">
          {tops.map((user, i) => (
            <Card key={i} i={i} user={user} screenSize={screenSize} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="text-black font-semibold mx-auto rounded-lg bg-white w-fit px-4 py-2">
        Ranking
      </h4>
      <div className="grid grid-cols-1 gap-8 px-4 py-2 my-8">
        {data.map((user, i) => (
          <Card key={i} i={i} user={user} screenSize={screenSize} />
        ))}
      </div>
    </>
  );
};

const RankingGrid = ({ data, screenSize }: RankingGridProps) => {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 py-2 border-t-2 my-8">
      {data.map((user, i) => {
        if (i > 2) {
          return <Card key={i} user={user} i={i} screenSize={screenSize} />;
        }
      })}
    </div>
  );
};

function getCurrentDimension() {
  return {
    width: window.innerWidth,
  };
}