import * as Joi from 'joi';

export const configSchema = () => {
  return Joi.object({
    NODE_ENV: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    PORT: Joi.number().required(),
  });
};
