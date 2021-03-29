const express = require('express');
const connection = require('./DV_connector');
const PurchaseRouter = express.Router();

const connector = require('./DV_connector');


PurchaseRouter.route('/')
.get(
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
.post(
    (req,res,next) =>{
        const {emp_id,sat_code,p_date} = req.body;
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
/*
.put(

)
*/
.delete(
    (req,res,next) =>{
        connection.query('delete from purchase_track',
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


//PurchaseRouter.route('/:id').get().push().put().delete();


module.exports = PurchaseRouter;