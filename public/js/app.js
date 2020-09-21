const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const p1 = document.querySelector("#forecast");
const p2 = document.querySelector("#location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  p1.textContent = "Loading ...";
  p2.textContent = "";

  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (res) => {
      res.json().then((data) => {
        if (data.error) {
          p1.textContent = data.error;
          p2.textContent = "";
        } else {


          p1.textContent = data.forecast;
          p2.textContent = data.location;
        }
      });
    }
  );
});
