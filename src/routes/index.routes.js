import { Router } from 'express';
import { chargeImage, processForm, renderForm, renderFormUpload, renderIndex } from '../controllers/index.controllers.js';

const router = Router();
router.get('/', renderIndex);
router.get('/registrar', renderForm);
router.post('/crearemprendimiento', processForm);
router.get('/upload/:id', renderFormUpload);
router.post('/upload/:id/charge', chargeImage);
export default router;