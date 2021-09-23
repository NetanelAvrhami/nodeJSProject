const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/expenses
    axios.get('http://localhost:3000/api/expenses')
        .then(function(response){
            res.render('index', { expenses : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
};

exports.specific_category = (req,res)=>{
    axios.get('http://localhost:3000/api/categories', { params : { id : req.query.id }})
    .then(function(expensedata){
        res.render("category", { expenses : expensedata.data});
    })
    .catch(err =>{
        res.send(err);
    });
};

exports.specific_date = (req,res)=>{
    axios.get('http://localhost:3000/api/date', { params : { month : req.query.month,year:req.query.year }})
    .then(function(expensedata){
        res.render("date", { expenses : expensedata.data});
    })
    .catch(err =>{
        res.send(err);
    });
};

exports.date_filter = (req,res)=>{
   res.render('date_filter');
};

exports.catogry_filter = (req,res)=>{
    res.render('category_filter');
 };

exports.add_expense = (req, res) =>{
    res.render('add_expense');
};

exports.register = (req, res) =>{
    res.render('register');
};
