const express = require('express');
const moment = require('moment');
const connection = require('./DV_connector');
const PurchaseRouter = express.Router();

const connector = require('./DV_connector');
const cors = require('./cors/corsSetup');


PurchaseRouter.route('/').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(cors.cors,
    (req,res,next) =>{
        connection.query('select * from purchase_track;',
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
.post(cors.corsWithOptions,
    (req,res,next) =>{
        //const {emp_id,sat_code,p_date} = req.body;
        const {emp_id,sat_code} = req.body;
        const p_date = new Date().toISOString().slice(0, 19).replace('T', ' '); // ajustar a hora de mexico
        const querry = `CALL PUSH_PURCHASE(?,?,?);`;

        connection.query(querry,[emp_id,sat_code,p_date],
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

.delete(
    (req,res,next) =>{
        connection.query('CALL DELETE_PURCHASES()',
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
);


PurchaseRouter.route('/:id').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(
    (req,res,next) =>{
        const {id} = req.params;
        connection.query('select * from purchase_track where purchase_id = ?',[id],
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
);


module.exports = PurchaseRouter;