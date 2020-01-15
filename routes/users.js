const router = require('express').Router();
const fs = require('fs');

const filePath = './data/users.json';

router.get('/', (req, res) => {
  console.log('dsaf');

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
    try {
      const users = JSON.parse(data);
      res.send(users);
    } catch (ex) {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
  });
});

router.get('/:id', (req, res) => {
  console.log('id');
  const { id } = req.params;

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }

    try {
      const users = JSON.parse(data);

      const user = users.filter((u) => {
        const { _id } = u;
        return _id === id;
      });

      if (!user.length) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(user);
    } catch (ex) {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
  });
});

module.exports = router;
