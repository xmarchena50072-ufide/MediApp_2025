import { Router } from 'express';
import { createLaboratorio, getLaboratorios, deleteLaboratorio } from '../controllers/laboratorio.controller';
import upload from '../utils/upload';

const router: Router = Router();

router.post('/', upload.array('archivos'), createLaboratorio);
router.get('/', getLaboratorios);
router.delete('/:id', deleteLaboratorio);

export default router;