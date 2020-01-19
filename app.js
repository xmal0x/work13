
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');


const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const badReq = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  //next();
};

app.use((req, res, next) => {
  req.user = {
    _id: '5e2485786ac3eaa0ab2c050a',
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(badReq);


app.listen(PORT, () => {
  console.log(`App listen on ${PORT}`);
});
