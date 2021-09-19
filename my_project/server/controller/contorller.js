var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        cost : req.body.cost,
        category : req.body.category,
        date : req.body.date,
        description: req.body.description,
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find().sort({ date : -1 })
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

exports.getTotalCostByDates = (req,res)=>{

    const month_name = req.query.month;
    const year_name = req.query.year;
    console.log("date_name:",month_name)
    console.log("year_name:",year_name)

    Userdb.find( { "$expr":{"$and":[ { "$eq": [{ "$month": "$date" }, Number(month_name)]},{ "$eq": [{ "$year": "$date" }, Number(year_name)]}] }}
    ).then(data =>{
        console.log("data:",data)
        if(!data){
            res.status(404).send({ message : "Not found category name "+ date_name})
        }else{
            res.send(data)
        }
    }) .catch(err =>{
        res.status(500).send({ message: "Error retrieving category with " + date_name})
    })
}

exports.getTotalCostByCategory = (req,res)=>{

    const cate_name = req.query.id;
    Userdb.find({ 'category':cate_name }).sort({date: -1 }).then(data =>{
        if(!data){
            res.status(404).send({ message : "Not found category name "+ id})
        }else{
            res.send(data)
        }
    }) .catch(err =>{
        res.status(500).send({ message: "Error retrieving category with " + id})
    })
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}