import express from 'express';
import controller from '../controllers/encryption.controller';

const router = express.Router();

router.post('/encrypt', controller.encrypt);
router.post('/decrypt', controller.decrypt);

export = router;