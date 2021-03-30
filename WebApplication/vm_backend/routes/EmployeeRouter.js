const express = require('express');
const connection = require('./DV_connector');
const EmployeeRouter = express.Router();

const connector = require('./DV_connector');

const cors = require('./cors/corsSetup');

EmployeeRouter.use(express.json());

EmployeeRouter.route('/').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(cors.cors,
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

.post(cors.corsWithOptions,
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

.put(cors.corsWithOptions,
    (req,res,next) =>{
        const {emp_id,account} = req.body;
        const querry = `CALL PUT_EMPLOYEE(?,?);`;
        connection.query(querry,[emp_id,account],
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);

                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }    
)

.delete(cors.corsWithOptions,
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


EmployeeRouter.route('/:id').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(cors.corsWithOptions,
    (req,res,next) =>{
        const {id} = req.params;
        connection.query('select * from employees where emp_id = ?',[id],
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }
)
/*
.post(
    (req,res,next) =>{
        console.log('POST operation not suported on /employees/'+req.params.id + "\nerror: 403");
    }
)

.put(    
    (req,res,next) =>{
        const id = req.params;
        console.log('PUT operation not suported on /employees/'+req.params.id + "\nerror: 403");

    }
)
*/
.delete(cors.corsWithOptions,
    (req,res,next) =>{
        const {id} = req.params;
        connection.query('delete from employees where emp_id = ?',[id],
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                    console.log("Employee deleted");
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }
);

module.exports = EmployeeRouter;