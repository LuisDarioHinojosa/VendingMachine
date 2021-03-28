var mysql      = require('mysql');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '(phoskyGUP28)',
    database : 'vm_iot'
});

connection.connect((err) =>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("Connected succesfully to DB");
    }
});

module.exports = connection;