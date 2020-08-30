const NotifMicroController               = require('./NotifMicroController/NotifMicroController');
const NotifMicroValidator                = require('./NotifMicroValidator/NotifMicroValidator');

app.post('/sendSMSService',        NotifMicroValidator.sendSMSService, NotifMicroController.sendSMSService)