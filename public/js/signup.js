const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("signupFormHandler fired");

  const fname = document.querySelector("#fname-signup").value.trim();
  const lname = document.querySelector("#lname-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (fname && lname && email && password) {
    const response = await fetch("/api/users/post", {
      method: "POST",
      body: JSON.stringify({ fname, lname, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      console.log("success!" + response.ok);
    } else {
      console.log("Bad Response");
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
