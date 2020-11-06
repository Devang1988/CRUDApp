const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require('mysql');



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Password123",
    database: "crudatabase"
    });

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password123",
        database: "crudatabase"
        });
        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.urlencoded({extended: true}))

        app.get('/api/get', (req, res)=> {
            const sqlSelect = "SELECT * FROM colours WHERE id=(SELECT max(id) FROM colours);";
            db.query(sqlSelect, (err, result) => {
                res.send (result);
                
            })
        })

        app.post('/api/insert', (req, res)=> {

            const colours = req.body.colours
            const sqlInsert = "INSERT INTO colours (colour) VALUES (?)"
            db.query(sqlInsert, [colours], (err, result)=> {
            console.log(result);
            })
        });

 

app.listen(3001, () => {
    console.log('running on port 3001')
})
