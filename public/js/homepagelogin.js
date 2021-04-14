const login = () => {
  console.log("login clicked");
  document.location.replace("/login");
};

document.querySelector("#login").addEventListener("click", login);
