// fetch("http://localhost:3000/weather?address=Tkibuli").then((response) =>
//   response
//     .json()
//     .then((response) =>
//       response.error
//         ? console.log(response.error)
//         : console.log(response.location, response.forecast)
//     )
// );

const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${weatherInput.value}`)
    .then((response) => {
      if (!response.ok) return;
      return response.json();
    })
    .then((response) => {
      if (response.error) return (messageOne.textContent = response.error);

      messageOne.textContent = response.location;
      messageTwo.textContent = response.forecast;
    });
  weatherInput.value = "";
});
