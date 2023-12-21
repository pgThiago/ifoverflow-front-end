"use client";

import { Card } from "../Card";
import { PodiumProps } from "../Podium";

interface RankingGridProps extends PodiumProps {}

export const RankingGrid = ({ data }: RankingGridProps) => {
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
