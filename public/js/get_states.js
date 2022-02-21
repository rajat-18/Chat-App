var states = document.getElementById("states");
var e = document.createElement("option");
e.textContent = "Select State";
e.value = "Select State";
states.appendChild(e);
for (const key of Object.keys(data)) {
  var element = document.createElement("option");
  element.textContent = key;
  element.value = key;
  states.appendChild(element);
}
function get_cities() {
  var state = document.getElementById("states").value;
  var cities = document.getElementById("cities");
  cities.innerHTML = "";
  for (const key of Object.keys(data)) {
    if (state === key) {
      for (const c of data[state]) {
        var city = document.createElement("option");
        city.textContent = c;
        city.value = c;
        cities.appendChild(city);
      }
    }
  }
}
