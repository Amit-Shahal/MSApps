var express = require('express');
var router = express.Router();
const services = require('../services/get.js');

router.post('/get-nine', async function (req, res) {
  if (!req.body.page) {
    res.sendStatus(400);
  }
  let data;
  try {
    data = await services.getData(req.body.category, req.body.page);
  } catch (err) {
    res.status(err.code).send(err.text);
  }

  if (req.body.sortID === 'desc' || req.body.sortID === 'asc')
    data = services.sortId(data, req.body.sortID);

  res.send(services.getNine(data, req.body.page));
});

module.exports = router;
