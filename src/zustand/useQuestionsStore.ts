import { QuestionType } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type useQuestionsStoreType = {
  questions: QuestionType[];
  setQuestions: (questions: QuestionType[]) => void;
};

export const useQuestionsStore = create<useQuestionsStoreType>()(
  devtools((set, get) => ({
    questions: [],
    // setQuestions: () => set((state) => ({ questions: state.questions })),
    setQuestions: (questions) => set({ questions }),
  }))
);
