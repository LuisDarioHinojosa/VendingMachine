const express = require('express');
const connection = require('./DV_connector');
const ProductRouter = express.Router();

const connector = require('./DV_connector');

ProductRouter.route('/')
.get(
    (req,res,next) =>{
        connection.query('select * from products;',
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
        const {name,supply,price,image,sat_code} = req.body;
        const querry = `CALL PUSH_PRODUCT(?,?,?,?,?);`;

        connection.query(querry,[name,supply,price,image,sat_code],
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
        connection.query('delete from products',
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



//ProductRouter.route('/:id').get().push().put().delete();



module.exports = ProductRouter;