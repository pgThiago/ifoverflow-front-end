export const getUserProfile = async (token?: string, queryKey?: any) => {
  const headers = {
    Authorization: `Bearer ${token || queryKey}`,
  };

  try {
    const response = await fetch(`${process.env.API_URL}/users/profile/`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const userProfile = await response.json();

    return userProfile;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
