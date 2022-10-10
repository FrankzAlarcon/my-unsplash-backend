import Joi from "joi";

const id = Joi.number().integer().min(1);
const label = Joi.string().min(3);
const url = Joi.string().uri();

export const getImageById = Joi.object({
  id: id.required()
});

export const getImagesByLabel = Joi.object({
  label: label.required()
})

export const createImage = Joi.object({
  label: label.required(),
  url: url.required()
});