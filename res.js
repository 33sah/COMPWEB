var resvalue = document.querySelector("#ResValue");
var resinput = document.querySelector("#ResRange");
resvalue.textContent = resinput.value;
resinput.addEventListener("input", (event) => {
  resvalue.textContent = event.target.value;
});