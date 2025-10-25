const { Router } = require('express');
const routes = Router();
const controller = require('../controllers/controller')

routes.get('/', controller.getAllCategories);
routes.get('/categories/:id', controller.getAllItemsOfCategory);
routes.get('/new-category', controller.createCategoryGet);
routes.post('/new-category', controller.createCategoryPost);
routes.get('/new-item', controller.createItemGet);
routes.post('/new-item', controller.createItemPost);
routes.get('/delete-category/:id', controller.deleteCategoryGet);
routes.post('/delete-category/:id', controller.deleteCategoryPost);
routes.get('/delete-item/:id', controller.deleteItemGet);
routes.post('/delete-item/:id', controller.deleteItemPost);
routes.get('/update-category/:id', controller.updateCategoryGet);
routes.post('/update-category/:id', controller.updateCategoryPost);
routes.get('/update-item/:id', controller.updateItemGet);
routes.post('/update-item/:id', controller.updateItemPost);
routes.get('/{*splat}', controller.error);

module.exports = routes;