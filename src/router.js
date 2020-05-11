const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const FishedController = require('./controllers/FishedController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

//USER
routes.get('/users', UserController.index);
routes.post('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

//ADDRESS
routes.get('/addresses', AddressController.index);
routes.get('/addresses/:id', AddressController.show);
routes.get('/users/:user_id/addresses', AddressController.showAllUser);
routes.post('/users/:user_id/addresses', AddressController.store);
routes.put('/addresses/:id', AddressController.update);
routes.delete('/addresses/:id', AddressController.destroy);

//FISHEDS
routes.get('/fisheds', FishedController.index);
routes.get('/fisheds/:id', FishedController.show);
routes.post('/users/:user_id/fisheds', FishedController.storeUser);
routes.post('/fisheds', FishedController.store);
routes.put('/fisheds/:id', FishedController.update);
routes.delete('/fisheds/:id', FishedController.delete);
// routes.delete('/users/:user_id/fisheds', FishedController.delete);

routes.get('/report', ReportController.show);

routes.get('/', (req, res) =>{
  return res.json({hello: 'World'});
})

module.exports = routes;