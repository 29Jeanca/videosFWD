const getUserProfile = async () => {
  const response = await fetch("http://localhost:8000/users/me/", {
    method: "GET",
    credentials: "include", // ✅ sin esto no se envía la cookie
  });
  const data = await response.json();
  return data;
};

export {getUserProfile}