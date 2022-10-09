const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./logger/logger');

const app = express();

const {
	host,
	user,
	pass
} = config.get('database');

mongoose.connect(`mongodb+srv://${user}:${pass}@${host}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		// require('./seed/seeder'), // Seed the database, ONLY ONCE MUST RUN
		// logger.info('Data has been seeded into the database.'),
		conn => logger.info('Connected to MongoDB Atlas'),
	).catch(err => logger.error(err));

//Cross Origin Resource Sharing
app.use(cors());
app.use(morgan('combined', {
	stream: logger.stream
}));
app.use(express.static('public'));
app.use(bodyParser.json());


const authencticateJwt = require('./models/auth/authenticate');

//For production -->normal working, with authentication, please comment out this block if you want to run to the integration tests

app.use('/all-place', authencticateJwt, require('./controllers/all-place/router'));
app.use('/place', require('./controllers/place/router'));
app.use('/player', require('./controllers/player/router'));
// app.use('/family-members', authencticateJwt, require('./controllers/family-member/router'));
// app.use('/directors', authencticateJwt, require('./controllers/director/router'));
app.use('/users', authencticateJwt, require('./controllers/user/router'));
app.use('/login', require('./controllers/login/router'));

//Just for testing purposes-->the authentication is not working here --> please comment out this block if your not testing

// app.use('/movies', require('./controllers/movie/router'));
// app.use('/main-actors', require('./controllers/main-actor/router'));
// app.use('/family-members', require('./controllers/family-member/router'));
// app.use('/directors', require('./controllers/director/router'));
// app.use('/watched-movies', require('./controllers/watched-movie/router'));


// If yout want to sure to work the backend by run, just comment out this block

app.use('/', (req, res, next) => {
	console.log(req.url);
	res.send('The FaMoBase v.1.0.0 backend is working!');
});

app.use((err, req, res, next) => {
	res.status = 500;
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;