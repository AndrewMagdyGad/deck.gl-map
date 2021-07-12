import * as Joi from 'joi';

// validate query params of GET /polygon/get-menu end-point
export const getPolygonsMenuSchema = Joi.object({
  page: Joi.number()
    .optional()
    .min(0),
  itemsPerPage: Joi.number()
    .optional()
    .min(1),
});

// validate query params of GET /polygon end-point
export const searchSchema = Joi.object({
  q: Joi.string()
    .trim()
    .required(),
});
