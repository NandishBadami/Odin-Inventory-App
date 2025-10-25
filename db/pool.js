const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: 'postgresql://postgres:rxrMNnXYIsEQWtYqcBRXkStUGMHjnQoq@switchyard.proxy.rlwy.net:24982/railways'
});