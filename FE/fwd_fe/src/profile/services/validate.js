export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const getUserProfile = async () => {
  const response = await fetch("http://localhost:8000/users/me/", {
    method: "GET",
    credentials: "include", 
  });
  const data = await response.json();
  return data;
};

const patchUserProfile = async (userData) => {
  const csrftoken = getCookie("csrftoken"); 

  const response = await fetch(`http://localhost:8000/users/me/update/`, {
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