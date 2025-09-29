import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
//import quoteRoutes from './routes/quote.route.js';
import contactRoute from './routes/contact.route.js';
import reviewsRoute from './routes/reviews.route.js';
//import payRoutes from './routes/pay.route.js';

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();


app.use(helmet());
app.use(cors({ origin: '*' }));

/* const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://msurveyingeomatics.com';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
})); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
//app.use('/api', payRoutes); 
app.use('/api/contact', contactRoute);
app.use('/api/reviews', reviewsRoute);
app.get('/health', (_req, res) => res.json({ ok: true }));

 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));
