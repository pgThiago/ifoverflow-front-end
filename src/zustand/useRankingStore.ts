import { RankingUserType } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type useRankingStoreType = {
  rankingTops: RankingUserType[];
  setRankingTops: (data: RankingUserType[]) => void;
};

export const useRankingStore = create<useRankingStoreType>()(
  devtools((set, get) => ({
    rankingTops: [],
    setRankingTops: (ranking) => set({ rankingTops: ranking }),
  }))
);
