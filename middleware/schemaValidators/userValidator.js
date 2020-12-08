import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

export function addUser(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    birthday: Joi.date().required(),
    username: Joi.string()
      .min(3)
      .max(30)
      .insensitive()
      .invalid("login", "register", "profile", "admin")
      .pattern(
        new RegExp(
          /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
        )
      )
      .required(),
    gender: Joi.number().required(),
    phone: Joi.string(),
    email: Joi.string()
      .min(5)
      .max(30)
      .pattern(
        new RegExp(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      )
      .required(),
    password: Joi.string().min(3).max(30).required(),
    repeat_password: Joi.required().valid(Joi.ref("password")),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function loginUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function changePassword(req, res, next) {
  const schema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function getUser(req, res, next) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export const resetPassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    retype_password: Joi.required().valid(Joi.ref("password")),
    jwt: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
