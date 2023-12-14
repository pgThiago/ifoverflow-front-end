export const getStates = async () => {
  const response = await fetch(`${process.env.API_URL}/states`);
  const states = await response.json();
  return states;
};
