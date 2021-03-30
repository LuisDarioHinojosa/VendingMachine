const express = require('express');
const connection = require('./DV_connector');
const ProductRouter = express.Router();

const connector = require('./DV_connector');
const cors = require('./cors/corsSetup');

ProductRouter.route('/').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(cors.cors,
    (req,res,next) =>{
        connection.query('select * from products;',
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
.put(cors.corsWithOptions,
    (req,res,next) =>{
        const {sat_code, supply}  = req.body;
        const querry = `CALL PUT_PRODUCT(?,?);`;
        connection.query(querry,[sat_code, supply],
            (err,rows,fields) =>{
                if(!err){
                    res.json(rows);
                }
                else{
                    console.log(err);
                    next();
                }
            }    
        );
    }
)
.delete(cors.corsWithOptions,
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



ProductRouter.route('/:id').options(cors.corsWithOptions,(req,res) =>{res.sendStatus(200);})
.get(cors.corsWithOptions,
    (req,res,next) =>{
        const {id} = req.params;
        connection.query('select * from products where sat_code = ?',[id],
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
        const {id} = req.params;
        connection.query('delete from products where sat_code = ?',[id],
            (err,rows,fields) => {
                if(!err){
                    res.json(rows);
                    console.log("product deleted");
                }else{
                    console.log(err);
                    next();
                }
            }
        );
    }
);




module.exports = ProductRouter;