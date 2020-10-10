const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f84c53d7ddc3b62e7961348da87b4e33&query='+latitude+','+longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
            return 
        }
        if (body.error) {
            callback('not a correct data ', undefined)
            return
        }
        callback(undefined, body.current)
    })
}
module.exports = forecast
