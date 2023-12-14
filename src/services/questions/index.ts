import { NewQuestionTypes } from "@/types";

export const getQuestions = async () => {
  const response = await fetch(`${process.env.API_URL}/questions`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Xabu no getQuestions");
  }

  const questions = await response.json();
  return questions;
};

export const getQuestion = async (questionId: any, token: string | null) => {
  const response = await fetch(
    `${process.env.API_URL}/questions/${questionId}`,
    {
      cache: "no-store",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const question = await response.json();

  return question;
};

export const postQuestion = async (
  question: NewQuestionTypes,
  token: string | null
) => {
  const payloadToAPI = {
    title: question.title,
    description: question.question,
    category_id: question.category_id,
  };
  const response = await fetch(`${process.env.API_URL}/questions`, {
    body: JSON.stringify(payloadToAPI),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao publicar sua pergunta. Tente novamente!");
  }

  return await response.json();
};

export const votePositiveQuestion = async (
  id: number,
  token: string | null
) => {
  const response = await fetch(
    `${process.env.API_URL}/questions/${id}/positive`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Erro ao votar. Tente novamente!");
  }
  return await response.json();
};

export const voteNegativeQuestion = async (
  id: number,
  token: string | null
) => {
  const response = await fetch(
    `${process.env.API_URL}/questions/${id}/negative`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao votar. Tente novamente!");
  }

  return await response.json();
};

export const getQuestionBySearch = async ({ queryKey }: any) => {
  const response = await fetch(
    `${process.env.API_URL}/questions/search/${queryKey[1]}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar pergunta sobre ${queryKey[1]}. Tente novamente!`
    );
  }

  const questions = await response.json();

  return questions;
};
