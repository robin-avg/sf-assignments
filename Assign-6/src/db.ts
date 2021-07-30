const Pool: any = require("pg").Pool;

const pool: any = new Pool({
    user: "postgres",
    password: "test123",
    database: "usermodel",
    host: "localhost",
    port: 5432
});

module.exports = pool;