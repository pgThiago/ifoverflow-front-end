import { RankingUserType } from "@/types";
import { Card } from "../Card";

export interface PodiumProps {
  data: RankingUserType[];
}

export const Podium = ({ data }: PodiumProps) => {
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
