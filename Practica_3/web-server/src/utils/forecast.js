// libro pg.29

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=b2f238b1517eed078fc98a3cc7dd4fff&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No se puede conectar al servicio meteorológico!', undefined)
        } else if (body.error) {
            callback('No se puede encontrar la ubicación. Prueba con otra', undefined)
        } else {
            //callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
            callback(undefined, 'País: ' + body.location.country + 
                '... El clima es: ' + body.current.weather_descriptions[0] + 
                '. Temperatura: ' + body.current.temperature + 
                ' grados. Hay un ' + body.current.precip + '% de probabilidad de lluvia.')
        }
    })
}

module.exports = forecast