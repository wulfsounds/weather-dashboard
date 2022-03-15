// Create a function that sets input in local storage
function setLocal() {

}

// Create a function that gets input from local storage and assigns it to 'city'
let city;

function getLocal() {
    
}

// Open Weather API
let apiKey = '1f56ef55a0f3d4c3bb739f2d664d73f9'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
  
});