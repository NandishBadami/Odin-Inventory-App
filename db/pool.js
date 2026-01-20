const { Pool } = require('pg');
require('dotenv').config();

const config = {
    user: `${process.env.user}`,
    password: `${process.env.password}`,
    host: `${process.env.host}`,
    port: process.env.port,
    database: `${process.env.database}`,
    ssl: {
        rejectUnauthorized: `${process.env.rejectUnauthorized}`,
        ca: process.env.ca,
    },
};

module.exports = new Pool(config);