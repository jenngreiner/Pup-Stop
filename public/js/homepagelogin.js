const login = (event) => {
  event.preventDefault();
  console.log("login clicked");
  window.location = "/login";
};

document.querySelector("#login").addEventListener("click", login);
