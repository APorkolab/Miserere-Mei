const express = require('express');
const logger = require('./logger/logger');
const {
	sequelize
} = require('./models');
const seedDatabase = require('./seed/seeder');
const cors = require('cors');

const app = express();

sequelize.authenticate()
	.then(async () => {
		logger.info('Connected to MySQL database');
		await seedDatabase();
	})
	.catch(err => logger.error('Unable to connect to the database:', err));

// Cross Origin Resource Sharing
const corsOptions = {
	origin: ['http://miserere.porkolab.hu', 'https://miserere.porkolab.hu'],
	optionsSuccessStatus: 200,
};

// Middleware-ek
app.use(cors(corsOptions));
app.use(morgan('combined', {
	stream: logger.stream
}));
app.use(express.static('public'));
app.use(bodyParser.json());

const authenticateJwt = require('./models/auth/authenticate');

// Route-ok
app.use('/allplace', authenticateJwt, require('./controllers/allplace/router'));
app.use('/place', require('./controllers/place/router'));
app.use('/player', require('./controllers/player/router'));
app.use('/users', authenticateJwt, require('./controllers/user/router'));
app.use('/login', require('./controllers/login/router'));

// Alap route teszteléshez
app.use('/', (req, res, next) => {
	console.log(req.url);
	res.send('The Miserere Mei v.1.0.0 backend is working!');
});

app.use((err, req, res, next) => {
	res.status(500);
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;