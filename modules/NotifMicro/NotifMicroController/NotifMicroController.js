let async                       = require('async');
let _                           = require('underscore');
let response                    = require('../../../utills/response');
let constants                   = require('../../../utills/constant');
let NotiMicroService            = require('./../NotifMicroServices/NotifMicroServices');

exports.sendSMSService          = sendSMSService;

async function sendSMSService(req, res) {
  try {
    let message_type      = req.body.message_type;
    let message_text      = req.body.message_text;
    let message_method    = req.body.message_method;  // 1 for sms , 2 for email , 3 for whatsapp
    let message_recipient = req.body.message_recipient;
    let message_sender    = req.body.message_sender;
    let message_subject   = req.body.message_subject || "";

    let internalMessageType = constants.messageType[message_type] ;
    if(!internalMessageType){
      return response.sendResponse(res, "Invalid Message Type", constants.responseFlags.SHOW_ERROR_MESSAGE)
    }
    if(message_method == constants.messageMethod.SMS){
      //SEND SMS
      NotiMicroService.sendSMS(message_recipient, message_text);
    }else if (message_method == constants.messageMethod.EMAIL){
      //SEND EMAIL
      if(!message_subject){
        return response.sendResponse(res, "Subject Required for email", constants.responseFlags.SHOW_ERROR_MESSAGE)
      }
      await NotiMicroService.sendEmail(message_sender, message_recipient, message_subject,message_text);
    }else if(message_method == constants.messageMethod.WHATSAPP){
      //SEND WHATSAPP MESSAGE
    }else {
      return response.sendResponse(res, "Invalid Message Method", constants.responseFlags.SHOW_ERROR_MESSAGE)
    }


    return response.sendSuccessResponse(res, {data})
  }catch (e){
    console.log("error",e);
    response.somethingWentWrongError(res);
  }
}