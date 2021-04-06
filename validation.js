import Joi from "@hapi/joi";

export const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4),
    email: Joi.string().required().email(),
    age: Joi.number(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};

export default { userValidation, loginValidation };
