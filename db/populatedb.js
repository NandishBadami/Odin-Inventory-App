const { Client } = require('pg');

const SQL = `
UPDATE categories SET items = 1 WHERE id =  19;
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: 'postgresql://postgres:1234@localhost:5432/top_users'
    });
    await client.connect();
    const {rows} = await client.query(SQL);
    console.log(rows);
    await client.end();
    console.log('Done!');
}

main();