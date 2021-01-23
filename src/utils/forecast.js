const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const uri = 'http://api.weatherstack.com/current?access_key=38d2f21fb6b0d916ba800607e9fccc8c&query=' + latitude + ',' + longitude
    request({uri, json: true}, (error, {body}) => {
        if(error) {
            callback('Cannot connect to weather service! Error message: ' + error.info, undefined)
        } else if(body.error) {
            callback('No results for your search term. Try another search. Error message: ' + body.error.info, undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] +
                            '. It is currently ' + body.current.temperature + ' degrees out. Feels like ' + 
                                        body.current.feelslike + ' degrees out, humidity is ' + body.current.humidity,
                location: body.location.name + ', ' + body.location.country
            }
                                        )
        }
    })
}

module.exports = forecast