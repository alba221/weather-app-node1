const request = require('postman-request')

const geocode = (address, callback) => {
    const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYmpvZTk4NSIsImEiOiJja2p0MWgxODA0NWE2Mnlsb2FqcXduMTh5In0.qGqvxfKBsVF1ft2cHLfmWw&limit=1'
    request({uri, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to mapping service!', undefined)
        } else if(body.features.length === 0) {
            callback('No results for your search term. Try another search!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode