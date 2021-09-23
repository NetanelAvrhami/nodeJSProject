var ExpenseDb = require('../model/model');

// create and save new expense
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new expense
    const expense = new ExpenseDb({
        cost : req.body.cost,
        category : req.body.category,
        date : req.body.date,
        description: req.body.description,
    });

    // save expense in the database
    expense
        .save(expense)
        .then(data => {
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

};

// retrieve and return all expenses/ retrive and return a single expense
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        ExpenseDb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found expense with id "+ id});
                }else{
                    res.send(data);
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving expense with id " + id});
            });

    }else{
        ExpenseDb.find().sort({ date : -1 })
            .then(expense => {
                res.send(expense);
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving expense information" });
            });
    }
};

exports.getTotalCostByDates = (req,res)=>{

    const monthName = req.query.month;
    const yearName = req.query.year;

    ExpenseDb.find( { "$expr":{"$and":[ { "$eq": [{ "$month": "$date" }, Number(monthName)]},{ "$eq": [{ "$year": "$date" }, Number(yearName)]}] }}
    ).then(data =>{
        if(!data){
            res.status(404).send({ message : "Not found category name "+ date_name});
        }else{
            res.send(data);
        }
    }) .catch(err =>{
        res.status(500).send({ message: "Error retrieving category with " + date_name});
    });
};

exports.getTotalCostByCategory = (req,res)=>{

    const cateName = req.query.id;
    ExpenseDb.find({ 'category':cateName }).sort({date: -1 }).then(data =>{
        if(!data){
            res.status(404).send({ message : "Not found category name "+ id});
        }else{
            res.send(data);
        }
    }) .catch(err =>{
        res.status(500).send({ message: "Error retrieving category with " + id});
    });
};


// Delete a expense with specified expense id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    ExpenseDb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`});
            }else{
                res.send({
                    message : "expense was deleted successfully!"
                });
            };
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete expense with id=" + id
            });
        });
};