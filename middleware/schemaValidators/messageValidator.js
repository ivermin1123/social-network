import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function sendMessage(req, res, next) {
  const schema = Joi.object({
    conversationId: Joi.objectId().required(),
    message: Joi.string().required(),
    type: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
