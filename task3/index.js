const express = require('express');
const routes = require('./src/routes/routes');
const config = require('./src/config/config');
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use('/', routes);

