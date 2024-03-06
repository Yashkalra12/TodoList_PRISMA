const {Pool} = require("pg");

const pool=new Pool({
    user:"postgres",
    password:"Yash@1578",
    host:"localhost",
    port:5432,
    database:"todos_db"

})
console.log("Connected to DB");

module.exports = pool;
