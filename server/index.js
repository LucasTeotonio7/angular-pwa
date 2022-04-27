const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const { insuranceSave, insuranceList } = require('./insurance-service');

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
