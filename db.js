const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"Eagle2022",
    host:"localhost",
    port:7000,
    database:"users"
});

module.exports = pool;