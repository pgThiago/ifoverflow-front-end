"use client";

import Loading from "@/app/loading";
import { Podium } from "@/components/Podium";
import { RankingGrid } from "@/components/RankingGrid";
import { useService } from "@/services";
import { RankingUserType } from "@/types";
import { useRankingStore } from "@/zustand/useRankingStore";
import { useQuery } from "@tanstack/react-query";

const Ranking = () => {
  const { getRanking } = useService();
  const { setRankingTops, rankingTops } = useRankingStore();

  const { data, isLoading } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRanking,
    onSuccess: (data) => {
      const tops = rearrangeRanking(data);
      setRankingTops(tops);
    },
  });

  const rearrangeRanking = (data: RankingUserType[]) => {
    if (data?.length >= 3) {
      const aux = data[0];
      data[0] = data[1];
      data[1] = aux;
    }

    return data?.slice(0, 3);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      {rankingTops && data && (
        <>
          <Podium data={rankingTops} />
          <RankingGrid data={data} />
        </>
      )}
    </main>
  );
};

export default Ranking;
