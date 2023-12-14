import { NewCommentOnAnswerTypes, NewCommentOnQuestionTypes } from "@/types";

export const postCommentOnQuestion = async (
  comment: NewCommentOnQuestionTypes,
  token: string | null
) => {
  const payloadToAPI = {
    description: comment.comment,
    question_id: comment.question_id,
  };
  const response = await fetch(`${process.env.API_URL}/comments/question`, {
    body: JSON.stringify(payloadToAPI),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao publicar seu comentário. Tente novamente!");
  }
};

export const postCommentOnAnswer = async (
  comment: NewCommentOnAnswerTypes,
  token: string | null
) => {
  const payloadToAPI = {
    description: comment.comment,
    answer_id: comment.answer_id,
  };
  const response = await fetch(`${process.env.API_URL}/comments/answer`, {
    body: JSON.stringify(payloadToAPI),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao publicar seu comentário. Tente novamente!");
  }
};
