const fetch = require('node-fetch');
const request = require('request');
const {api_url} = require("./config.json")

const settings = {
    method: "Get"
};

function parsedJSON(json , message) {
    if(!json) {
        return "There are no alerts at all"
    }
    json.forEach(element => {
        message += `\n${element["alertDate"]}\n${element["data"]}\n-----------------`
    });
    return message
}

const fetchData = (callback) => fetch(api_url, settings)
    .then(res => res.json())
    .then((json) => {
        // do something with JSON
        const fixed_json = json.slice(0 , 5)
        callback(parsedJSON(fixed_json , ":red_circle: 5 last alerts update : \n"))
    });

var data;
var watchAlerts = (callback) => {
        request(api_url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              if(!data){
                data = body;
              } else {
                    if(data === body) {
                        console.log('[*] Clear');
                    } else {
                        clearInterval(watchAlerts);
                        data = body
                        console.log('[!] Red alert detected');
                        const new_data = JSON.parse(data).slice(0 , 2)
                        callback(parsedJSON(new_data , ":red_circle: new alert detected!\n"))
                    }  
              }
          }
        });
    }

 module.exports = {fetchData , watchAlerts}