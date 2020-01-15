const router = require('express').Router();
const fs = require('fs');

const filePath = './data/cards.json';

router.get('/', (req, res) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
    try {
      const cards = JSON.parse(data);
      res.send(cards);
    } catch (ex) {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
  });
});

module.exports = router;
