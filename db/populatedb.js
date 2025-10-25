const { Client } = require('pg');
require('dotenv').config();

const SQL = `
SELECT * FROM categories;
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${process.env.db_user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.db}`
    });
    await client.connect();
    const {rows} = await client.query(SQL);
    console.log(rows);
    await client.end();
    console.log('Done!');
}

main();