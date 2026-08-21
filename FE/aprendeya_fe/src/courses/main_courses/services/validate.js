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

const getCourses = async () => {
  const csrftoken = getCookie("csrftoken");
    const response = await fetch(`http://localhost:8000/courses/create-course/`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    credentials: "include",
    });
    const data = await response.json();
    return data;
};

export { getCourses };