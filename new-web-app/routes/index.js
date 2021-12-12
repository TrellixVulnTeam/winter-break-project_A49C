const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeController.getStores))
router.get('/stores', catchErrors(storeController.getStores))
router.get('/add', storeController.addStore)
router.get('/stores/:id/edit', catchErrors(storeController.editStore))
// we wrap the call to createStore in catchErrors
// which is in the handlers helper functions directory
// the functionality within catchErrors allows us to catch errors
// on all routes and send send flow to the function that follows the
// route to all paths in app.js, which is the line "app.use(errorHandlers.notFound);"
// we don't have to handle errors in the controllers anywhere now
// saves us from using duplicate code
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));

router.get('/reverse/:name', (req, res) =>
{
  const reverse = [...req.params.name].reverse().join('')
  res.send(req.params.name);
})

module.exports = router;
