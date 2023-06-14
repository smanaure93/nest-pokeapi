export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'env',
  mongodb: process.env.MONGODB,
  port: +process.env.PORT || 4200,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
