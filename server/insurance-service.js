const { INSURANCES } = require('./in-memory-db');

exports.insuranceSave = (req, res) => {
  const insurance = req.body;

  INSURANCES.push(insurance);
  console.log('Seguro adicionado', insurance);

  res.status(200).json({message: 'Seguro adicionado com sucesso'});
}

exports.insuranceList = (req, res) => {
  res.status(200).json(INSURANCES);
}
