// const ulGroup = document.createElement("ul")
// const week = document.getElementById("week")
// week.appendChild(ulGroup)


// Set 'get-city' value to localStorage.

let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  if (window.localStorage) {
    let getLocation = document.getElementById("get-city");
    localStorage.setItem("get-city", getLocation.value);
    getLocation.value = localStorage.getItem("get-city");
    
    //move outside and create function for if statement?
    // let searchBtn = document.getElementById("search-btn");
    // searchBtn.addEventListener("click", function () {
    // })
    // function > fetch?
  }

})

let city = localStorage.getItem("get-city")

// .replaceAll(' ', '');

// Open Weather API
let apiKey = '1f56ef55a0f3d4c3bb739f2d664d73f9'
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


fetch(queryURL)
.then(function (response) {
  console.log(response.statusText)
  return response.json();
})
.then(function (data) {
  console.log(Math.floor(data.main.temp))
  console.log(data.name)

  // let temp = data.main.temp;
  // let listTemp = document.createElement('li')
});