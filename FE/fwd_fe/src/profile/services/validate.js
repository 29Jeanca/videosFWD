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
  if(data.detail==="Authentication credentials were not provided."){
    return null;
  }
  return data;
};

const getData = async ()=>{
  const csrftoken = getCookie("csrftoken"); 

  const response = await fetch(`http://localhost:8000/community/posts/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken, 
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  
  return data;
}
const getCategories = async ()=>{
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/create-category/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const getPostComments = async (postId)=>{
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/post-comments/${postId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
const getPostById = async (postId)=>{
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/post/${postId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const postLikeUnlike = async (postId) => {
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/like-unlike-post/${postId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
const getLikedPosts = async (postId) => {
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/likes-by-post/${postId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
const newPost = async (postData) => {
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/create-post/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const getPostByCategory = async (categoryId)=>{
  const csrftoken = getCookie("csrftoken");
  const response = await fetch(`http://localhost:8000/community/posts-by-category/${categoryId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
  
export {getUserProfile, patchUserProfile,getData,getCategories,getPostComments,postLikeUnlike,getLikedPosts,newPost, getPostById, getPostByCategory};