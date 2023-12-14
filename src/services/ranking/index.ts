export const getRanking = async () => {
  const response = await fetch(`${process.env.API_URL}/users/ranking/`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar ranking");
  }
  const ranking = await response.json();
  return ranking;
};
