const helper = require('sendgrid').mail;
const Promise = require('bluebird');

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

module.exports = {

  sendEmails: (recipients, emailInfo, completion) => {
    const from_email = new helper.Email('nerdyemmanuel@gmail.com');
    const subject = emailInfo.subject;
    const content = new helper.Content('text/html', emailInfo.content);

    recipients.forEach((recipient, i) => {
      const to_email = new helper.Email(recipient.trim());
      const mail = new helper.Mail(from_email, subject, to_email, content);

      //const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        if(error) {
          //reject(error);
          //return;
        }

        //resolve(response);
      });
    });

    completion();
  },

  sendEmail: function(emailInfo) {

    return new Promise(function(resolve, reject) {
      const from_email = new helper.Email('nerdyemmanuel@gmail.com');
      const to_email = new helper.Email(emailInfo.recipient);
      const subject = emailInfo.subject;
      const content = new helper.Content('text/html', emailInfo.content);
      const mail = new helper.Mail(from_email, subject, to_email, content);

      const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        if(error) {
          reject(error);
          return;
        }

        resolve(response);
      });



    });
  }

};
