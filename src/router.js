const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const FishedController = require('./controllers/FishedController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/fisheds', FishedController.list);
routes.get('/users/:user_id/fisheds', FishedController.index);
routes.post('/users/:user_id/fisheds', FishedController.store);
routes.put('/users/:user_id/fisheds', FishedController.update);
routes.delete('/users/:user_id/fisheds', FishedController.delete);

routes.get('/report', ReportController.show);


routes.get('/', (req, res) =>{
  return res.json({hello: 'World'});
})

module.exports = routes;