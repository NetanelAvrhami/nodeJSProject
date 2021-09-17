const express = require('express');
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/contorller')

route.get('/',services.homeRoutes);
route.get('/add-expense',services.add_user);
route.get('/update-user',services.update_user);
route.get('/see', services.specific_category);
route.get('/filterbycategory', services.catogry_filter);


//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.get('/api/categories',controller.getTotalCostByCategory)
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);



module.exports = route