const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: 'postgresql://postgres:SRdABQPJPEPSgerYKfoGEQhrTiGWOviG@shuttle.proxy.rlwy.net:23284/railway'
});