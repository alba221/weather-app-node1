const weatherForm = document.getElementById('locationForm')
const searchLocation = document.getElementById('inputLocation')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(!searchLocation.value) {
        return message1.textContent = 'Please provide an address!'
    }

    message1.textContent = 'Loading...'
    message2.textContent = ''

    getForecast(searchLocation.value)
})

const getForecast = (address) => {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.place
                message2.textContent = data.forecast
                // console.log(data.address)
                // console.log(data.location)
                // console.log(data.place)
                // console.log(data.forecast)
            }
        })
    })
}