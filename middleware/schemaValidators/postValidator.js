import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function getPost(req, res, next) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function createPost(req, res, next) {
  const validateObject = Object.assign({}, req.body);
  if (validateObject.tags)
    validateObject.tags = JSON.parse(validateObject.tags);

  const schema = Joi.object({
    description: Joi.string().allow("").required(),
    tags: Joi.array(),
    coordinates: Joi.string().allow(""),
    locationName: Joi.string().allow(""),
    files: Joi.array(),
  });

  const { error, value } = schema.validate(validateObject);
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
  next();
}
