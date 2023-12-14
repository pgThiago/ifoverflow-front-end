import { NewAnswerOnQuestionTypes } from "@/types";

export const postAnswer = async (
  answer: NewAnswerOnQuestionTypes,
  token: string | null
) => {
  const payloadToAPI = {
    description: answer.answer,
    question_id: answer.question_id,
  };
  const response = await fetch(`${process.env.API_URL}/answers`, {
    body: JSON.stringify(payloadToAPI),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao publicar sua resposta. Tente novamente!");
  }
  return await response.json();
};

export const votePositiveAnswer = async (id: number, token: string | null) => {
  const response = await fetch(
    `${process.env.API_URL}/answers/${id}/positive`,
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

export const voteNegativeAnswer = async (id: number, token: string | null) => {
  const response = await fetch(
    `${process.env.API_URL}/answers/${id}/negative`,
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

export const acceptAnswer = async (id: number, token: string | null) => {
  const response = await fetch(`${process.env.API_URL}/answers/${id}/accept`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao votar. Tente novamente!");
  }

  return await response.json();
};
