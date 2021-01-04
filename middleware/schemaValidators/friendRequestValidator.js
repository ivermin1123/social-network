import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function sendFriendRequest(req, res, next) {
  const schema = Joi.object({
    receiver: Joi.objectId().required(),
    sender: Joi.objectId().required(),
    requestId: Joi.objectId(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function friendRequest(req, res, next) {
  const schema = Joi.object({
    receiver: Joi.objectId().required(),
    sender: Joi.objectId().required(),
    requestId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
