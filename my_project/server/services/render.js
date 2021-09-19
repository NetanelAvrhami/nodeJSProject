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

    
}

exports.specific_category = (req,res)=>{
    axios.get('http://localhost:3000/api/categories', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("category", { users : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })

}

exports.specific_date = (req,res)=>{
    axios.get('http://localhost:3000/api/date', { params : { month : req.query.month,year:req.query.year }})
    .then(function(userdata){
        res.render("date", { users : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })

}

exports.date_filter = (req,res)=>{
   res.render('datefilter');

}

exports.catogry_filter = (req,res)=>{
    res.render('categoryfilter');
 
 }

exports.add_user = (req, res) =>{
    res.render('add_expense');
}

exports.register = (req, res) =>{
    res.render('register');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}