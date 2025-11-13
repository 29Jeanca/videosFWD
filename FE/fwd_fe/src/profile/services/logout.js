const logoutUser = async () => {
  try {
    await fetch("http://localhost:8000/users/logout/", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  } 
};
export { logoutUser };