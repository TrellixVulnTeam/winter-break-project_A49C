const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');

router.get('/', storeController.homePage)
router.get('/add', storeController.addStore)
router.post('/add', storeController.createStore);

router.get('/reverse/:name', (req, res) =>
{
  const reverse = [...req.params.name].reverse().join('')
  res.send(req.params.name);
})

module.exports = router;
