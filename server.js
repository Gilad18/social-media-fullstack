const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const path = require('path');
// const os = require('os');
app.use(cors());
const port = process.env.PORT || 4500;

const socialRoute = require('./server/routes/routes')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/social/api', socialRoute);

// app.get('/api/getUser', (req, res) => res.send({ username: os.userInfo().username }));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.d82yt.mongodb.net/social`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("database connect")
});

app.get('/', (req, res) => {
  res.json({ success: 'Social API' })
})

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize route

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => {
  return console.log(`application start`);
})
