const express = require('express');
const router = express.Router();
const utils = require('../utils');
//const helper = require('sendgrid').mail;



router.post('/:action', function(req, res, next) {

    let action = req.params.action;


    if(action === 'send') {

      const recipients = req.body.recipients;
      let list = recipients.split(',');

      utils.Email.sendEmails(list, req.body, () => {
        res.json({
          confirmation: 'success',
          message: 'Emails sent'
        });
      });

      /*utils.Email.sendEmail(req.body)
        .then((response) => {
          res.json({
            confirmation: 'success',
            response: response
          });
        })
        .catch((err) => {
          res.json({
            confirmation: 'fail',
            message: err
          });
        });*/


      return;
    }

    res.json({
      confirmation: 'fail',
      message: 'Invalid Action'
    });



});



module.exports = router;
