import e, { Router } from "express";
import { validationHandler } from "../middlewares/validation.handler";
import { createImage, getImageById, getImagesByLabel } from "../schemas/image.schema";
import { ImageService } from "../services/image.service";

const router = Router();
const imageService: ImageService = new ImageService();

router.get('/', async (req, res, next) => {
  try {
    const {limit, offset} = req.query;
    const images = await imageService.findAll({limit: Number(limit ?? 10), offset: Number(offset ?? 0)});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({message: (error as Error).message});
  }
});

router.get('/:id', validationHandler(getImageById, 'params'), async (req, res, _next) => {
  try {
    const { id } = req.params;
    const image = await imageService.findOne(Number(id));
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({message: (error as Error).message});
  }
});

router.get('/search', validationHandler(getImagesByLabel, 'query'), async (req, res, _next) => {
  try {
    const { label } = req.query;
    const images = await imageService.findByLabel(String(label));
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({message: (error as Error).message});
  }
});

router.post('/', validationHandler(createImage, 'body'), async (req, res) => {
  try {
    const image = await imageService.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({message: (error as Error).message});
  }
});

router.delete('/:id', validationHandler(getImageById, 'params'), async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageService.remove(Number(id));
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({message: (error as Error).message});
  }
});

export default router;