import { z } from 'zod'
import { sendTeamEmail, sendAckEmail } from '../services/mailer.service.js'
import crypto from 'crypto'

const ContactSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().optional(),
  //subject: z.string().min(2).max(100),
  message: z.string().min(10).max(2000),
  hp: z.string().max(0).optional().default('') 
})

export async function postContact(req, res) {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: 'Validation failed',
      errors: parsed.error.flatten()
    });
  }
  const { name, email, phone,  message } = parsed.data;

  try {
    await sendTeamEmail({ name, email, phone, message });
    await sendAckEmail({ to: email, name });

    //  reference code
    const ref = 'MSG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') 
                + '-' + crypto.randomBytes(2).toString('hex');

    return res.json({
      ok: true,
      message: `Thank you, ${name}! Your inquiry has been received. A confirmation email has been sent to ${email}.`,
      ref
    });
  } catch (e) {
    console.error('MAIL SEND FAILED:', e?.message || e);
    return res.status(500).json({
      ok: false,
      message: 'We could not send your inquiry at this time. Please try again later.'
    });
  }
}
