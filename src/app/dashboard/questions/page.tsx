/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { QuestionList, QuestionListSkeleton } from "@/components/questionList";
import { useService } from "@/services";
import { CategoryType } from "@/types";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuestionsStore } from "@/zustand/useQuestionsStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Questions = () => {
  const searchParamHook = useSearchParams();
  const { user } = useAuthStore();
  const { questions, setQuestions } = useQuestionsStore();
  const { getCategories } = useService();
  const { getQuestionsOfSpecificCategory, getQuestions } = useService();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const searchParam = searchParamHook.get("search");
  const categoryParam = searchParamHook.get("category");

  const {
    data: questionsDefault,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    enabled: !categoryId && !search,
  });

  useEffect(() => {
    if (!searchParam && !categoryParam && questionsDefault) {
      setQuestions(questionsDefault);
    }
  }, []);

  const {
    data: questionsbyCategory,
    isLoading: isLoadingByCategory,
    isFetching: isFetchingByCategory,
  } = useQuery({
    queryKey: ["categoryId", categoryId],
    queryFn: getQuestionsOfSpecificCategory,
    enabled: categoryParam !== null,
  });

  useEffect(() => {
    if (categoryParam && questionsbyCategory?.questions) {
      setQuestions(questionsbyCategory.questions);
    }
    if (!searchParam && !categoryParam) {
      setQuestions(questionsDefault);
    }
  }, [searchParam, categoryParam, questionsbyCategory, questionsDefault]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    setSearch(searchParam as string);
  }, [searchParam]);

  useEffect(() => {
    const categoryNameParam = searchParamHook.get("category") as string;
    const foundCategory = categories?.find(
      (category: CategoryType) =>
        category.name.replace(/\s/gm, "-").toLowerCase() === categoryNameParam
    );
    if (foundCategory) {
      setCategoryId(foundCategory.id);
      setCategoryName(foundCategory.name);
    }
  }, [categories, searchParamHook]);

  return (
    <>
      <div className="flex h-full items-center justify-center w-full">
        {!questions &&
          !searchParam &&
          !categoryParam &&
          !isFetching &&
          !isFetchingByCategory && (
            <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-sm md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
              Nenhuma pergunta encontrada
            </h4>
          )}

        {!categoryParam && !searchParam && questions && (
          <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-sm md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
            Perguntas
          </h4>
        )}

        {categoryParam && questions?.length === 0 && !searchParam && (
          <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-xs md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
            {`Nenhuma pergunta encontrada na categoria ${categoryName}`}
          </h4>
        )}

        {searchParam && questions?.length === 0 && !categoryParam && (
          <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-xs md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
            {`Nenhuma pergunta com "${searchParam}" foi encontrada`}
          </h4>
        )}

        {searchParam && questions?.length > 0 && (
          <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-xs md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
            {`Perguntas com "${search}"`}
          </h4>
        )}

        {categoryParam && questions?.length > 0 && (
          <h4 className="font-semibold text-black shadow-2xl  shadow-sky-900 text-xs md:text-lg mx-auto mb-4 rounded-lg bg-white w-fit px-4 py-2">
            {categoryName}
          </h4>
        )}
      </div>

      <div>
        {!questions &&
          ((isLoading && isFetching && <QuestionListSkeleton />) ||
            (isLoadingByCategory && isFetchingByCategory && (
              <QuestionListSkeleton />
            )))}

        {questions?.length > 0 && (
          <QuestionList questions={questions} userId={user?.id} />
        )}
      </div>
    </>
  );
};

export default Questions;
