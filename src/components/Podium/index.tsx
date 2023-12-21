import { RankingUserType } from "@/types";
import { Card } from "../Card";

export interface PodiumProps {
  data: RankingUserType[];
}

export const Podium = ({ data }: PodiumProps) => {
  //   const rearrangeRanking = (data: RankingUserType[]) => {
  //     const newTops = data.slice(0, 3).map((user, index) => {
  //       if (index === 0) {
  //         const aux = data[index];
  //         data[index] = data[1];
  //         data[1] = aux;
  //       }
  //       return user;
  //     });
  //     return newTops;
  //   };

  //   const rearrangeRanking = (data: RankingUserType[]) => {
  //     const newTops = data.slice(0, 3).map((user, index) => {
  //       if (index < 2) {
  //         const aux = data[index];
  //         data[index] = data[index + 1];
  //         data[index + 1] = aux;
  //       }
  //       return user;
  //     });

  //     return newTops;
  //   };

  //   const rearrangeRanking = (data: RankingUserType[]) => {
  //     if (data.length >= 3) {
  //       const aux = data[0];
  //       data[0] = data[1];
  //       data[1] = aux;
  //     }

  //     return data.slice(0, 3);
  //   };

  //   const tops = rearrangeRanking(data);

  return (
    <>
      <h4 className="text-black font-semibold mx-auto rounded-lg bg-white w-fit px-4 py-2">
        Ranking
      </h4>
      <div className="flex gap-2 p-2 items-start justify-center md:gap-4 py-2 my-8">
        {data.map((user, i) => (
          <Card key={i} i={i} user={user} />
        ))}
      </div>
    </>
  );
};
