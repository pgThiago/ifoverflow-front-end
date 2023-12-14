export const getCategories = async () => {
  const response = await fetch(`${process.env.API_URL}/categories`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });

  const categories = await response.json();

  return categories;
};

export const getQuestionsOfSpecificCategory = async ({
  queryKey,
}: any): Promise<any> => {
  const categoryId = Number(queryKey[1]);

  if (!categoryId) {
    return [];
  }

  const response = await fetch(
    `${process.env.API_URL}/categories/${categoryId}/questions`,
    {
      cache: "no-store",
    }
  );
  const questions = await response.json();
  return questions;
};
