// libro pg32
const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    const url = 'http://api.weatherstack.com/current?access_key=b2f238b1517eed078fc98a3cc7dd4fff&query=' + address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No se puede conectar con los servicios de ubicación!', undefined)
        } //else if (body.features.length === 0) {
        else if (body.location.length === 0) {
            callback('No se puede encontrar la ubicación. Intente otra búsqueda.', undefined)
        } 
        else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            })
            /*callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })*/
        }
    })
}

module.exports = geocode