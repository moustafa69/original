import * as Joi from 'joi';

export const configSchema = () => {
  return Joi.object({
    NODE_ENV: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    PORT: Joi.number().required(),

    ADMIN_JWT_SECRET: Joi.string().required(),
    ADMIN_JWT_REFRESH_SECRET: Joi.string().required(),

    USER_JWT_SECRET: Joi.string().required(),
    USER_JWT_REFRESH_SECRET: Joi.string().required(),

    SELLER_JWT_SECRET: Joi.string().required(),
    SELLER_JWT_REFRESH_SECRET: Joi.string().required(),

    JWT_EXPIRY: Joi.number().required(),
    JWT_REFRESH_EXPIRY: Joi.string().required(),

    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
  });
};
