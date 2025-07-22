export const authenticateUser = async (email: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error || "Error desconocido");
  }

  const { token } = await response.json();
  return token;
};
