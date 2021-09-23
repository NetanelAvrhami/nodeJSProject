const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/contorller');

route.get('/',services.homeRoutes);
route.get('/add-expense',services.add_expense);
route.get('/see', services.specific_category);
route.get('/see_date', services.specific_date);
route.get('/filterbycategory', services.catogry_filter);
route.get('/filterbydate', services.date_filter);


//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.get('/api/categories',controller.getTotalCostByCategory);
route.get('/api/date',controller.getTotalCostByDates);
route.delete('/api/users/:id',controller.delete);



module.exports = route;