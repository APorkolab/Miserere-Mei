require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});