const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8500;

const staffs = require('./routes/staffRoutes');
const users = require('./routes/userRoutes');
const clubs = require('./routes/clubRoutes');
const aboutUs = require('./routes/aboutUsRoutes');
const tournaments = require('./routes/tournamentRoutes');
const info= require('./routes/infoRoutes');
const results = require('./routes/resultRoutes');
const matches= require('./routes/matchRoutes');
const players= require('./routes/playerRoutes');
const destinations= require('./routes/destinationRoutes');
const tennisPosts= require('./routes/tennisPostsRoutes');
const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', users);
app.use('/admin', staffs);
app.use('/admin', clubs);
app.use('/admin', aboutUs);
app.use('/admin', tournaments);
app.use('/admin', info);
app.use('/admin', results);
app.use('/admin', matches);
app.use('/admin', players);
app.use('/admin',destinations)
app.use('/admin',tennisPosts)

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});