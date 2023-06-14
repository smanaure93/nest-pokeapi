import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(4200),
  DEFAULT_LIMIT: joi.number().default(10),
});
