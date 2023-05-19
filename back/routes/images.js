var express = require('express');
var router = express.Router();
const services = require('../services/get.js');

router.post('/get-nine', async function (req, res) {
  if (!req.body.page) {
    return res.sendStatus(400);
  }
  let data;
  try {
    //get data
    data = await services.getData(req.body.category, req.body.page);
    //sort data
    if (req.body.sortID === true) {
      data = services.sortId(data);
    }
    // slice page and send
    return res.send(services.getNine(data, req.body.page));
  } catch (err) {
    return res.status(err.code).send(err.text);
  }
});

module.exports = router;
