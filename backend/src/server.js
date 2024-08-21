const express = require('express');
const logger = require('./logger/logger');
const {
	sequelize
} = require('./models');
const seedDatabase = require('./seed/seeder');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Adatbázis kapcsolat és inicializálás
sequelize.authenticate()
	.then(async () => {
		logger.info('Connected to MySQL database');
		await seedDatabase();
	})
	.catch(err => logger.error('Unable to connect to the database:', err));

// Cross Origin Resource Sharing (CORS) beállítás
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(origin => origin.trim());

app.use(cors({
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			logger.error(`CORS error: Origin ${origin} not allowed`);
			callback(new Error('Not allowed by CORS'));
		}
	}
}));

// Loggolás
app.use(morgan('combined', {
	stream: logger.stream
}));

// Statikus fájlok kezelése
app.use(express.static('public'));

// JSON kérések feldolgozása
app.use(express.json());

// Autentikációs middleware
const authenticateJwt = require('./models/auth/authenticate');

// Route-ok beállítása
app.use('/allplace', authenticateJwt, require('./controllers/allplace/router'));
app.use('/place', require('./controllers/place/router'));
app.use('/player', require('./controllers/player/router'));
app.use('/users', authenticateJwt, require('./controllers/user/router'));
app.use('/login', require('./controllers/login/router'));

// Alapértelmezett útvonal a teszteléshez
app.use('/', (req, res, next) => {
	console.log(req.url);
	res.send('The Miserere Mei v.1.0.0 backend is working!');
});

// Hibakezelés
app.use((err, req, res, next) => {
	res.status(500);
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;