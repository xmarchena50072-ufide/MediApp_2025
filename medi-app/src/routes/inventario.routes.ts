import { Router } from 'express';
import { createInventory, getInventory, updateInventory } from '../controllers/inventario.controller';

const router: Router = Router();

router.post('/', createInventory);
router.get('/', getInventory);
router.put('/:id', updateInventory);

export default router;