import { formatEvents } from "../extras/formaterInfo";

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
async function getAllEvents() {
  const csrftoken = getCookie("csrftoken");
  try {
    const response = await fetch(`http://localhost:8000/events/all-events/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
    });
    const data = await response.json();
    return formatEvents(data);
  } catch (error) {
    console.error(error);
  }
}
const postEvent = async (eventData) =>{
  const csrftoken = getCookie("csrftoken");
  try{
    const response = await fetch(`http://localhost:8000/events/user-events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const getUserEvents = async () =>{
  const csrftoken = getCookie("csrftoken");
  try{
    const response = await fetch(`http://localhost:8000/events/user-events/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
    });
    const data = await response.json();
    return formatEvents(data);
  } catch (error) {
    console.error(error);
  }
}
export { getAllEvents, postEvent, getUserEvents };