const express = require('express');
const app = express();
const routes = require('./routers/routes');

app.use(express.urlencoded({extended: true}));
app.use('/', routes);

app.listen(3000, err => {
    if(err) throw err;
    console.log('Server running on http://localhost:3000');
});