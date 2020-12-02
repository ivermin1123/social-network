import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function commentOnPost(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  const schema = Joi.object({
    postId: Joi.objectId().required(),
    parent: Joi.objectId(),
    content: Joi.string().required(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
