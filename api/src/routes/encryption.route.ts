import express from 'express';
import controller from '../controllers/encryption.controller';

const router = express.Router();

router.get('/encrypt', controller.encrypt);
router.get('/decrypt', controller.decrypt);

export = router;