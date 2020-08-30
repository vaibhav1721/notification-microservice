
exports.sendSMS             = sendSMS;
exports.sendEmail           = sendEmail;

var accountSid              = config.get('twillioCredentials.accountSid');
var authToken               = config.get('twillioCredentials.authToken');


const nodemailer            = require('nodemailer');
const client                = require('twilio')(accountSid, authToken);
const Promise               = require('bluebird');


function sendSMS( contact_number, message) {
  client.messages.create({
    to  : contact_number, // Any number Twilio can deliver to
    from: config.get('twillioCredentials.fromNumber'),
    body: message// body of the SMS message
  }, function (err, response) {
    if (err) {
      console.log("Sms service: Error: " + err);
      console.log("Sms service: Response: " + response);
    }
  });
};


function sendEmail (from, receiverMailId , subject, body) {
  return new Promise( async (resolve,reject) => {
    let smtpTransport;
    smtpTransport = nodemailer.createTransport({
      host: config.get('emailCredentials.host'),
      port: config.get('emailCredentials.port'),
      auth: {
        user: user,
        pass: api_key
      }
    });
    var mailOptions = {
      from   : from,            // sender address
      to     : receiverMailId, // list of receivers
      subject: subject,       // Subject line
      html   : body,         // html body
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        smtpTransport.close(); // shut down the connection pool, no more messages
        return resolve({status: 0, error: error});
      } else {
        smtpTransport.close(); // shut down the connection pool, no more messages
        return resolve({status: 1, response: response});
      }
    })
  })
}