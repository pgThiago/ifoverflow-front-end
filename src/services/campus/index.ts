export const getCampuByState = async ({ queryKey }: any) => {
  const response = await fetch(
    `${process.env.API_URL}/states/${Number(queryKey[1])}/campus`
  );

  if (!response.ok) return "Erro ao buscar os campos";

  const campus = await response.json();
  return campus;
};
