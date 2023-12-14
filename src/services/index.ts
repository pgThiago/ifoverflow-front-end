import {
  acceptAnswer,
  postAnswer,
  voteNegativeAnswer,
  votePositiveAnswer,
} from "./answers";
import { createUser, login } from "./auth";
import { getCampuByState } from "./campus";
import { getCategories, getQuestionsOfSpecificCategory } from "./categories";
import { postCommentOnAnswer, postCommentOnQuestion } from "./comments";
import {
  getQuestion,
  getQuestions,
  postQuestion,
  voteNegativeQuestion,
  votePositiveQuestion,
  getQuestionBySearch,
} from "./questions";
import { getRanking } from "./ranking";
import { getStates } from "./states";
import { getUserProfile } from "./user";

export const useService = () => {
  return {
    createUser,
    login,
    getUserProfile,
    getCategories,
    getQuestions,
    postQuestion,
    getQuestionsOfSpecificCategory,
    getQuestion,
    getQuestionBySearch,
    votePositiveQuestion,
    voteNegativeQuestion,
    postAnswer,
    votePositiveAnswer,
    voteNegativeAnswer,
    acceptAnswer,
    postCommentOnQuestion,
    postCommentOnAnswer,
    getStates,
    getCampuByState,
    getRanking,
  };
};
