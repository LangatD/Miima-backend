
import { z } from 'zod';
import nodemailer from 'nodemailer';
import Quote from '../models/Quote.js';
import crypto from 'crypto';


const GoogleFormsQuoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street address is required"),
  zip: z.string().min(1, "ZIP code is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Service type is required"),
  serviceOther: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  desiredStartDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  hp: z.string().optional().nullable(), 
});

function makeRef() {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth()+1).padStart(2,'0');
  const d = String(now.getDate()).padStart(2,'0');
  const short = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `Q${y}${m}${d}-${short}`;
}


