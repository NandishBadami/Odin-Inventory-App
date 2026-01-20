const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    SELECT * FROM categories;
`;

/* 

CREATE TABLE categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    items INTEGER
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    quantity INTEGER,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE NOT NULL
);
*/

async function main() {
    console.log('seeding...');
    const client = new Client(config);
    await client.connect();
    const {rows} = await client.query(SQL);
    console.log(rows);
    await client.end();
    console.log('Done!');
}

main();