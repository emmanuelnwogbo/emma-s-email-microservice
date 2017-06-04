const express = require('express');
const router = express.Router();



router.get('/:action', function(req, res, next) {

  let action = req.params.action;

  if(action === 'send') {
    res.json({
      confirmation: 'success',
      action: action
    });
    return;
  }

  res.json({
    confirmation: 'fail',
    message: 'Invalid Action'
  });


});


module.exports = router;
