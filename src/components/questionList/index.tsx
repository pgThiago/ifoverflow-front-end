"use client";

import { Question, QuestionSkeleton } from "@/components/question";
import { QuestionType } from "@/types";

interface QuestionListProps {
  questions: QuestionType[] | null;
  userId: number | undefined;
  isSearching?: boolean;
}

export const QuestionList = ({
  questions,
  userId,
  isSearching,
}: QuestionListProps) => {
  return questions?.map((question: QuestionType) => (
    <Question
      key={question.id}
      question={question}
      isOwnerOfQuestion={
        isSearching
          ? question?.user_id === userId
          : question?.user?.id === userId
      }
      isShowingDetails={false}
    />
  ));
};

export const QuestionListSkeleton = () => {
  const skeletonElements = [];

  for (let i = 0; i < 10; i++) {
    skeletonElements.push(<QuestionSkeleton key={i} />);
  }

  return <div>{skeletonElements}</div>;
};
