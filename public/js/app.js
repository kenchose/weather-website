console.log("Client side javascript is loaded")
//
// Goal: Fetch weather
//
// 1. Setup a call to fetch weather from boston
// 2. Get the parsed JSON response
//  - if error property, print error
//  - if no error property, print location and forecast
//
// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//     response.json().then((data) => { // response.json() fetches json data then parses it to js object
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log("Location: " + data.location)
//             console.log("Forecast: " + data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const message1 = document.querySelector("#message1")
const message2 = document.querySelector("#message2")

//
// Goal: Rendering conents to paragraphs
// 
// 1. Select the second msg p from js
// 2. Just before fetch, render loading msg and empty p
// 3. If error, render msg
// 4. If no error, render location and forecast
// 5. Test your work with using valid/invalid locations
//

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent from browser from reloading
    message1.textContent = "Loading..."
    message2.textContent = ""
    const location = search.value
    // fetch(`http://localhost:3000/weather?address=${location}`).then((response) => { // localhost is taken out because we will be using the heroku app url
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = "Error: " + data.error
            } else {
                message1.textContent = "Location: " + data.location
                message2.textContent = "Forecast: " + data.forecast
            }
        })
    })
})

//
// Goal: Use input value to get weather
//
// 1. migrate fetch call to into the submit callback
// 2. Use the seardch text as an address query string value
// 3. submit the form with a valid and invalid value to test
//