const request = require('request')

const geocodes= (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2h5YXRpLTkiLCJhIjoiY2tldXg2MnhjMnY3dzMzbzh3c203bXQydyJ9.loTlMktRWUqYho_2M76Y2Q&limit=1'
    request({ url, json: true }, (error, { body })=> {
         if (error) {
             callback('unable to connect', undefined)
             return 
         }
         if (body.features.length === 0) {
             callback('no such place exit', undefined)
             return
         }
         const data = {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
         }
         callback(undefined,data)
})
}
module.exports= geocodes