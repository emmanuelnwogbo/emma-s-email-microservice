const express = require('express');
const router = express.Router();
const helper = require('sendgrid').mail;



router.post('/:action', function(req, res, next) {

    let action = req.params.action;

    if(action === 'send') {

      const from_email = new helper.Email('nerdyemmanuel@gmail.com');
      const to_email = new helper.Email(req.body.recipient);
      const subject = req.body.subject;
      const content = new helper.Content('text/html', req.body.content);
      const mail = new helper.Mail(from_email, subject, to_email, content);

      const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        if(error) {
          res.json({
            confirmation: 'fail',
            message: error
          });
          return;
        }

        res.json({
          confirmation: 'success',
          action: action
        });
        //console.log(response.statusCode);
        //console.log(response.body);
        //console.log(response.headers);
      });


      /*res.json({
        confirmation: 'success',
        action: action
      });*/

      return;
    }

    res.json({
      confirmation: 'fail',
      message: 'Invalid Action'
    });



});

router.get('/:action', function(req, res, next) {

  let action = req.params.action;

  if(action === 'send') {

    const from_email = new helper.Email('nerdyemmanuel@gmail.com');
    const to_email = new helper.Email('emmanwogbo20@yahoo.com');
    const subject = 'TEST!';
    const content = new helper.Content('text/html', 'Hello, Email!!');
    const mail = new helper.Mail(from_email, subject, to_email, content);

    const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      if(error) {
        res.json({
          confirmation: 'fail',
          message: error
        });
        return;
      }

      res.json({
        confirmation: 'success',
        action: action
      });
      //console.log(response.statusCode);
      //console.log(response.body);
      //console.log(response.headers);
    });


    /*res.json({
      confirmation: 'success',
      action: action
    });*/

    return;
  }

  res.json({
    confirmation: 'fail',
    message: 'Invalid Action'
  });


});


module.exports = router;
