const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');



const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
// app.get('/', (req, res) => {
//   res.sendFile('/chat');
// });
const sess = {
  secret: 'bigbluedog',
  cookie: {
        // Session will automatically expire in 10 minutes
        expires: 10 * 60 * 1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);



io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

var numberUsers = 0;
io.on('connection', (socket) => {
var userStarted = false;
socket.on('new_message', (msg) => {
socket.broadcast.emit('new_message', {
username: socket.username,
message: msg
});
});
socket.on('user_added', (username) => {
if (userStarted) return;
socket.username = username;
userStarted = true;
numberUsers++;
socket.emit('login', {
numberOfUsers: numberUsers
});
socket.broadcast.emit('user_joined', {
username: socket.username,
numberOfUsers: numberUsers
});
});
socket.on('typing', () => {
socket.broadcast.emit('typing', {
username: socket.username
});
});
socket.on('disconnect', () => {
if (userStarted) {
--numberUsers;
socket.broadcast.emit('user_left', {
username: socket.username,
numberOfUsers: numberUsers
});

}
});
});
// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  // app.listen(PORT, () => console.log('Now listening'));
  server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
});
