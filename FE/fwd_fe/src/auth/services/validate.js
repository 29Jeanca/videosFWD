const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:8000/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ¡esto es esencial para enviar/recibir cookies!
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await response.json();
  return data; 
};
export { loginUser };