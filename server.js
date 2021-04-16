// This server will call a weather api and check from humidty and then send a text to my number if it is below a certain amount.

//axios
const axios = require('axios').default;

//twilio
const accountSid = '***REMOVED***';
const authToken = '***REMOVED***';
const client = require('twilio')(accountSid, authToken);

//openweathermap
const apiKey = '***REMOVED***';
const charlestonID = '4574324';

//Humidity threshhold
const humThresh = 70;

// call to weather api with check and then call to twillio
const apiCall = () => {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            id: charlestonID,
            appid: apiKey,
            units: 'imperial'
        }
    })
    .then(function (response) {
        var humidity = response.data.main.humidity;
        if (humidity < humThresh) {
            client.messages.create({
                body: `SPRAY NOSE! HUMIDITY IS ${humidity}`,
                from: '***REMOVED***',
                to: '***REMOVED***'
            })
            .then(message => console.log(message.sid))
            .catch(error => console.log(error));
        }
        else { console.log('good to go chris!') }
    })
    .catch(error => console.log(error));
}

console.log('hello!!');











