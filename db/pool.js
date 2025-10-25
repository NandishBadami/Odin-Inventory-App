const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/top_users'
});