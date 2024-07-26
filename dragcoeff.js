var DCvalue = document.querySelector("#DCValue");
var DCinput = document.querySelector("#DCRange");
DCvalue.textContent = DCinput.value;
DCinput.addEventListener("input", (event) => {
  DCvalue.textContent = event.target.value;
});