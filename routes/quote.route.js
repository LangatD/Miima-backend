/* 
import express from 'express';
import { 
  createQuoteFromGoogleForms, 
  verifyFormsSecret,
  healthCheck 
} from '../controllers/quote.controller.js';

const router = express.Router();


router.get('/quotes/health', healthCheck);


router.post('/', verifyFormsSecret, createQuoteFromGoogleForms);

export default router;

 */