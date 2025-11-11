const getUserProfile = async () => {
  const response = await fetch("http://localhost:8000/users/me/", {
    method: "GET",
    credentials: "include", 
  });
  const data = await response.json();
  return data;
};
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const patchUserProfile = async (userData) => {
  const csrftoken = getCookie("csrftoken"); 

  const response = await fetch(`http://127.0.0.1:8000/users/me/update/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken, 
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

export {getUserProfile, patchUserProfile}