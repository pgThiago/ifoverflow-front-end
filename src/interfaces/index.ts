import React from "react";
import {
  AnswerType,
  CategoryType,
  CommentType,
  QuestionType,
  RankingUserType,
  StateType,
} from "../types";

export interface ICategoriesProps {
  categories?: CategoryType[];
}
export interface ICategoriesMobileProps {
  showCategories: boolean;
  categories: CategoryType[];
  handleToggleCategories: () => void;
}

export interface IQuestionClientProps {
  categories: CategoryType[];
}

export interface IQuestionItemProps {
  question: QuestionType;
  isShowingDetails: boolean;
  isOwnerOfQuestion: boolean;
}

export interface IAnswerItemProps {
  answer: AnswerType;
  isShowingDetails: boolean;
  isOwnerOfAnswer: boolean;
  isOwnerOfQuestion: boolean;
  hasBestAnswer: boolean;
  // isAccepted: boolean;
}

export interface IRankingProps {
  users: RankingUserType[];
}

export interface ICommentItemProps {
  comment: CommentType;
  isOwnerOfComment: boolean;
}

export interface IMainContentProps {
  children?: React.ReactNode;
}

export interface IQuestionListProps {
  children: React.ReactNode;
}

export interface ICategoryListProps {
  categories: CategoryType[];
  handleCategories: (id: string) => void;
}

export interface IMenuItemProps {
  isOpen?: boolean;
}

export interface INewQuestionProps {
  categories: CategoryType[];
}

export interface IRegisterProps {
  states: StateType[];
}
