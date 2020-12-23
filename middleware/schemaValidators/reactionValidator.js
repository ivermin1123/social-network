import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function likePost(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  const schema = Joi.object({
    postId: Joi.objectId().required(),
    type: Joi.number().required(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function likeComment(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  const schema = Joi.object({
    postId: Joi.objectId().required(),
    commentId: Joi.objectId().required(),
    type: Joi.number().required(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function countReaction(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  const schema = Joi.object({
    postId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
