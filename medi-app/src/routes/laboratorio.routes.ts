import { Router, Request, Response } from 'express';
import Laboratorio from '../models/laboratorio.model';
import upload from '../utils/upload';

const router: Router = Router();

router.post('/', upload.array('archivos'), async (req: Request, res: Response) => {
  try {
    const { paciente } = req.body;
    const archivos = (req.files as Express.Multer.File[]).map((file) => file.filename);
    const laboratorio = new Laboratorio({ paciente, archivos });
    await laboratorio.save();
    res.status(201).send(laboratorio);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const laboratorios = await Laboratorio.find().populate('paciente');
    res.status(200).send(laboratorios);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const laboratorio = await Laboratorio.findByIdAndDelete(req.params.id);
    if (!laboratorio) {
      return res.status(404).send();
    }
    res.status(200).send(laboratorio);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;