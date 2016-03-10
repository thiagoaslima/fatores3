import express from 'express';
var app = express();

app.get('/', function (req, res) {
  var json = require('./server/teste.json');
  res.type('text/json'); // set content-type
  res.send(json); // send text response
});

var api = [
  'atividade',
  'atividadeTarefa',
  'cenario',
  'cenarioDia',
  'empresa',
  'funcao',
  'levantamento',
  'obra',
  'producao',
  'server',
  'tarefa',
  'teste'
];

/*
 * $http response
data – {string|Object} – The response body transformed with the transform functions.
status – {number} – HTTP status code of the response.
headers – {function([headerName])} – Header getter function.
config – {Object} – The configuration object that was used to generate the request.
statusText – {string} – HTTP status text of the response.
*/

api.forEach(end => {
  app.get('/' + end, function (req, res) {
    var json = require('./server/' + end + '.json');
    res.type('text/json'); // set content-type
    res.send(json); // send text response
  });
});

app.listen(4720);