
var Joi                                         = require('joi');
var validator                                   = require('../../../validator/validator');

var apiReferenceModule                          = "NotifMicro";


exports.sendSMSService                          = sendSMSService;

function sendSMSService(req,res,next) {
  req.apiReference = {
    module: apiReferenceModule,
    api: "sendSMSService"
  };
  var schema = Joi.object().keys({
    message_type : Joi.number().required(),
    message_text : Joi.string().required(),
    message_method : Joi.number().required(),
    message_recipient : Joi.array().required(),
    message_sender    : Joi.array().optional(),
    message_subject   : Joi.string().optional()
  });
  var validFields = validator.validateFields(req.apiReference, req.body, res, schema);
  if (validFields) {
    next();
  }
}