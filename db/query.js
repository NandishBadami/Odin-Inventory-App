const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY id');
    return rows;
}

async function getAllItemsOfCategory(id) {
    const {rows} = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);
    const category = await pool.query('SELECT name FROM categories WHERE id = $1', [id]);
    if(category.rows.length > 0) return [rows, category.rows[0].name];
    return [undefined, undefined];
}

async function createCategory(name) {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
}

async function createItem(name, quantity, category_id) {
    let category_items = await pool.query('SELECT items FROM categories WHERE id = $1', [category_id]);
    category_items = category_items.rows[0].items + 1;
    await pool.query('UPDATE categories SET items = $1 WHERE id = $2', [category_items, category_id]);
    await pool.query('INSERT INTO items (name, quantity, category_id) VALUES ($1, $2, $3)', [name, quantity, category_id]);
}

async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

async function deleteItem(id) {
    const { rows } = await pool.query('SELECT category_id FROM items WHERE id = $1', [id]);
    if(rows.length > 0) {
        let items = await pool.query('SELECT items FROM categories WHERE id = $1', [rows[0].category_id]);
        items = items.rows[0].items - 1;
        await pool.query('UPDATE categories SET items = $1 WHERE id = $2', [items, rows[0].category_id]);
        await pool.query('DELETE FROM items WHERE id = $1', [id]);
        return rows[0].category_id;
    }
    return undefined;
}

async function getCategory(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if(rows.length > 0) return rows;
    return undefined;
}

async function updateCategory(id, name) {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id]);
}

async function getItem(id) {
    const {rows} = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if(rows.length > 0) return [rows[0].name, rows[0].quantity, rows[0].category_id];
    return [undefined, undefined, undefined];
}

async function updateItem(id, name, quantity, category_id) {
    await pool.query('UPDATE items SET name = $1, quantity = $2, category_id = $3 WHERE id = $4', [name, quantity, category_id, id]);    
}

async function updateCategoryItems(id, items) {
    await pool.query('UPDATE categories SET items = $1 WHERE id = $2', [items, id]);
}

module.exports = {
    getAllCategories,
    getAllItemsOfCategory,
    createCategory,
    createItem,
    deleteCategory,
    deleteItem,
    updateCategory,
    getCategory,
    getItem,
    updateItem,
    updateCategoryItems
}