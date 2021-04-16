// This server will call a weather api and check from humidty and then send a text to my number if it is below a certain amount.

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//axios
const axios = require('axios').default;

//twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twillioNum = process.env.TWILLIO_NUM;
const cellNum = process.env.CELL_NUM;

//openweathermap
const apiKey = process.env.API_KEY;
const charlestonID = '4574324';

//Humidity threshhold
const humThresh = 100;

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
                from: twillioNum,
                to: cellNum
            })
            .then(message => console.log(message.sid))
            .catch(error => console.log(error));
        }
        else { console.log('good to go chris!') }
    })
    .catch(error => console.log(error));
}

apiCall();
console.log('hello!!');
console.log(process.env);











