const express = require('express');
const connection = require('./DV_connector');
const EmployeeRouter = express.Router();

const connector = require('./DV_connector');


EmployeeRouter.use(express.json());

EmployeeRouter.route('/')

.get(
    (req,res,next) =>{
        connection.query('select * from employees',
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                    //res.statusCode = 200;
                    //res.setHeader('Content-Type','application/json')
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }
)
.post(
    (req,res,next) =>{
        const {name,emp_id,password} = req.body;
        const querry = `CALL PUSH_EMPLOYEE(?,?,?);`;

        connection.query(querry,[name,emp_id,password],
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                    //res.statusCode = 200;
                    //res.setHeader('Content-Type','application/json')
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }    
)
/*
.put(

)
*/
.delete(
    (req,res,next) =>{
        connection.query('delete from employees',
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                    //res.statusCode = 200;
                    //res.setHeader('Content-Type','application/json')
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }    
);


//EmployeeRouter.route('/:id').get().push().put().delete();

module.exports = EmployeeRouter;