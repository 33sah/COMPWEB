var anglevalue = document.querySelector("#AngleValue");
var angleinput = document.querySelector("#AngleRange");
anglevalue.textContent = angleinput.value;
angleinput.addEventListener("input", (event) => {
  anglevalue.textContent = event.target.value;
});