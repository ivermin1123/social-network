import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function getConversation(req, res, next) {
  const schema = Joi.object({
    conversationId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function addConversation(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  if (validateObject.tags)
    validateObject.tags = JSON.parse(validateObject.tags);

  const schema = Joi.object({
    members: Joi.array().required(),
    message: Joi.string().allow("").required(),
    type: Joi.number(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
  next();
}
