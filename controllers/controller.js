const db = require('../db/query');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    console.log(categories);
    res.render('../views/index.ejs', {categories: categories});
}

async function getAllItemsOfCategory(req, res) {
    let [items, category_name] = await db.getAllItemsOfCategory(req.params.id);
    if(category_name) res.render('../views/items.ejs', {items: items, category_name: category_name});
    else error(req, res);
}

function createCategoryGet(req, res) {
    res.render('../views/createCategory.ejs');
}

async function createCategoryPost(req, res) {
    if((req.body.name).trim() != '') {
        await db.createCategory(req.body.name);
        res.redirect('/');
    }
    else res.render('../views/createCategory.ejs', {error: 'Name cannot be empty'});
}

async function createItemGet(req, res) {
    const categories = await db.getAllCategories();
    res.render('../views/createItem.ejs', {categories: categories});
}

async function createItemPost(req, res) {
    const categories = await db.getAllCategories();
    if((req.body.name).trim() == '' || (req.body.quantity).trim() == '' || (req.body.category_id).trim() == '') {
        res.render('../views/createItem.ejs', {categories: categories, error: 'All 3 Fields are mandatory!'});
        return;
    }
    await db.createItem(req.body.name, parseInt(req.body.quantity), parseInt(req.body.category_id));
    res.redirect('/categories/' + req.body.category_id);
}

function deleteCategoryGet(req, res) {
    res.render('../views/delete.ejs');
}

async function deleteCategoryPost(req, res) {
    if(req.body.password != '9148') {
        res.render('../views/delete.ejs', {error: 'Incorrect Password'});
        return;
    }
    await db.deleteCategory(req.params.id);
    res.redirect('/');
}

function deleteItemGet(req, res) {
    res.render('../views/delete.ejs');
}

async function deleteItemPost(req, res) {
    if(req.body.password != '9148') {
        res.render('../views/delete.ejs', {error: 'Incorrect Password'});
        return;
    }
    const category_id = await db.deleteItem(req.params.id);
    if(category_id) res.redirect('/categories/' + category_id);
    else res.redirect('/');
}

async function updateCategoryGet(req, res) {
    const category_name = await db.getCategory(req.params.id);
    if(category_name) res.render('../views/createCategory.ejs', {category_name: category_name[0].name});
    else res.redirect('/');
}

async function updateCategoryPost(req, res) {
    if((req.body.name).trim() == '') {
        res.render('../views/createCategory.ejs', {category_name: req.body.name, error: 'Name Should not be empty'});
        return;
    } else if(req.body.password != '9148') {
        res.render('../views/createCategory.ejs', {category_name: req.body.name, error: 'Incorrect Password'});
        return;
    }
    await db.updateCategory(req.params.id, req.body.name);
    res.redirect('/');
}

async function updateItemGet(req, res) {
    const [item_name, item_quantity, item_category_id] = await db.getItem(req.params.id);
    if(item_name && item_quantity && item_category_id) {
        const categories = await db.getAllCategories();
        res.render('../views/createItem.ejs', {item_name: item_name, item_quantity: item_quantity, item_category_id: item_category_id, categories: categories});
    }
    else res.redirect('/');
}

async function updateItemPost(req, res) {
    if((req.body.name).trim() == '' || (req.body.quantity).trim() == '' || (req.body.category_id).trim() == '') {
        const categories = await db.getAllCategories();
        res.render('../views/createItem.ejs', {item_name: req.body.name, item_quantity: req.body.quantity, item_category_id: req.body.category_id, categories: categories, error: 'All Fields are mandatory!'});
        return;
    } else if(req.body.password != '9148') {
        const categories = await db.getAllCategories();
        res.render('../views/createItem.ejs', {item_name: req.body.name, item_quantity: req.body.quantity, item_category_id: req.body.category_id, categories: categories, error: 'Incorrect Password!'});
        return;
    }
    const category_id = await db.getItem(req.params.id);
    let category_rows = await db.getCategory(category_id[2]);
    let category_items = category_rows[0].items - 1;
    await db.updateCategoryItems(category_rows[0].id, category_items);
    await db.updateItem(req.params.id, req.body.name, req.body.quantity, req.body.category_id);
    category_rows = await db.getCategory(req.body.category_id);
    category_items = category_rows[0].items + 1;
    await db.updateCategoryItems(category_rows[0].id, category_items);
    res.redirect('/categories/' + req.body.category_id);
}

function error(req, res) {
    res.render('../views/404.ejs');
}

module.exports = {
    getAllCategories,
    getAllItemsOfCategory,
    createCategoryGet,
    createCategoryPost,
    createItemGet,
    createItemPost,
    deleteCategoryGet,
    deleteCategoryPost,
    deleteItemGet,
    deleteItemPost,
    updateCategoryGet,
    updateCategoryPost,
    updateItemGet,
    updateItemPost,
    error
}