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


PurchaseRouter.route('/:id')
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
/*
.post(
    (req,res,next) =>{
        console.log('POST operation not suported on /purchases/'+req.params.id + "\nerror: 403");
    }
)
.put(    
    (req,res,next) =>{
        const id = req.params;
        console.log('PUT operation not suported on /purchases/'+req.params.id + "\nerror: 403");

    }
)
.delete(
    (req,res,next) =>{
        const id = req.params;
        console.log('DELETE operation not suported on /purchases/'+req.params.id + "\nerror: 403");

    }
);
*/

module.exports = PurchaseRouter;