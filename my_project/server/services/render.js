const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
};

exports.specific_category = (req,res)=>{
    axios.get('http://localhost:3000/api/categories', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("category", { users : userdata.data});
    })
    .catch(err =>{
        res.send(err);
    });
};

exports.specific_date = (req,res)=>{
    axios.get('http://localhost:3000/api/date', { params : { month : req.query.month,year:req.query.year }})
    .then(function(userdata){
        res.render("date", { users : userdata.data});
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
