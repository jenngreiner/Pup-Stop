const addYardFormHandler = async (event) => {
  event.preventDefault();
  console.log("addYardFormHandler fired");

  const name = document.querySelector("#name-yard").value.trim();
  const description = document.querySelector("#description-yard").value.trim();
  const address = document.querySelector("#address-yard").value.trim();
  const city = document.querySelector("#city-yard").value.trim();
  const state = document.querySelector("#state-yard").value.trim();
  const zip = document.querySelector("#zip-yard").value.trim();
  const rate = document.querySelector("#rate-yard").value.trim();
  const fence = document.querySelector("#fence-yard").value.trim();
  const water = document.querySelector("#water-yard").value.trim();
  const hasPets = document.querySelector("#pets-yard").value.trim();

  if (
    name &&
    description &&
    address &&
    city &&
    state &&
    zip &&
    rate &&
    fence &&
    water &&
    hasPets
  ) {
    const response = await fetch("/api/yards", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        address,
        city,
        state,
        zip,
        rate,
        fence,
        water,
        hasPets,
      }),
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
  .querySelector(".addyard-form")
  .addEventListener("submit", addYardFormHandler);
