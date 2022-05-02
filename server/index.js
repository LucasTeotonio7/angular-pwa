const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const { insuranceSave, insuranceList } = require('./insurance-service');
const webpush = require('web-push');

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey: 'BEVRxq6wJ7nFBfkdYS8lyMojMr8fkg7mG4EHq71x_G35a5grc8Iu31lsKRC6uCQ82qI1V0EOJjskaj5VYDRUwZ8',
  privateKey: 'DMAU9Ym8AsWvyCt1ZypvppLrr43kuKpxZouNcuV5Vu8'
}

webpush.setVapidDetails(
  'test@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const app = express();

// TODO: BODY-PARSE
app.use(bodyParse.json())

// TODO: CORS
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,

};
app.use(cors(corsOptions));

app.route('/api/insurance').post(insuranceSave);
app.route('/api/insurance').get(insuranceList);


const HOST = 'localhost';
const PORT = 9000;



const httpServer = app.listen(PORT, HOST, ()=> {
  console.log(`servidor rodando em http://${HOST}:${PORT}`)
})
