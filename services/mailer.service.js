import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  ADMIN_EMAILS,
  BANK_DETAILS_TEXT,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});
//test

const TEAM = (ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function sendTeamEmail({ name, email, phone, subject, message }) {
  const submissionTime = new Date().toLocaleString();

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f5f7fa;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700;">MIIMA SURVEYING & GEOMATICS</h1>
        <p style="margin: 15px 0 0 0; font-size: 18px;">New Contact Inquiry Received</p>
        <div style="background: rgba(255,255,255,0.1); margin: 20px auto 0; padding: 10px 20px; border-radius: 25px; display: inline-block;">
          <span style="font-size: 14px;"> ${submissionTime}</span>
        </div>
      </div>
      
      <div style="background: white; padding: 40px 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
       
        
        <!-- Contact Info -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a5f; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #2c5aa0;">👤 Contact Information</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 10px 0; color: #2c5aa0; font-size: 16px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2c5aa0; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${
                  phone || "N/A"
                }" style="color: #2c5aa0; text-decoration: none;">${
    phone || "Not provided"
  }</a></td>
              </tr>
            </table>
          </div>
        </div>
        
        <!-- Inquiry Details -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a5f; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #28a745;">📋 Inquiry Subject</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 5px solid #28a745;">
            <p style="margin: 0; color: #333; font-size: 18px; font-weight: 600;">${subject}</p>
          </div>
        </div>
        
        <!-- Message -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a5f; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #ff9800;">💬 Message</h3>
          <div style="background: #fff8e1; padding: 20px; border-radius: 8px; border-left: 5px solid #ff9800; line-height: 1.6; color: #333;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <!-- Action Required -->
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #ffc107; text-align: center; margin-bottom: 30px;">
          <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">⚡ ACTION REQUIRED</h3>
          <p style="color: #856404; margin: 0; font-size: 16px;">
            Please respond to this inquiry within 24 hours.
          </p>
        </div>
        
        <!-- Action Buttons -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)} " 
             style="background: #2c5aa0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px; font-weight: bold; box-shadow: 0 4px 6px rgba(44,90,160,0.3);">
            📧 Reply via Email
          </a>
          ${
            phone
              ? `
          <a href="tel:${phone}" 
             style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px; font-weight: bold; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">
            📞 Call Now
          </a>
          `
              : ""
          }
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #1e3a5f; color: white; padding: 20px; text-align: center; border-radius: 0 0 12px 12px;">
        <p style="margin: 0; font-weight: bold;">Miima Surveying & Geomatics LLC</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">12-14 Elm St, Unit 13, Montclair, NJ 07042 • +1 (201) 456-7411</p>
      </div>
    </div>
  `;

  const textBody = `
NEW CONTACT INQUIRY - Miima Surveying & Geomatics


Time: ${submissionTime}

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

INQUIRY SUBJECT:
${subject}

MESSAGE:
${message}

---
Website: msurveyingeomatics.com
  `;

  return transporter.sendMail({
    from: `"Miima Survey & Geomatics" <${FROM_EMAIL || SMTP_USER}>`,
    to: TEAM,
    replyTo: `${name} <${email}>`,
    subject: `CONTACT: ${subject} – ${name}`,
    text: textBody,
    html: htmlBody,
  });
}

export function sendAckEmail({ to, name, subject }) {
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f5f7fa;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">MIIMA SURVEYING & GEOMATICS</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Professional Land Surveying Services in New Jersey</p>
      </div>
      
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <h2 style="color: #1e3a5f; margin: 0 0 25px 0; font-size: 24px;">Hi ${name}</h2>
        
        <p style="color: #333; line-height: 1.7; font-size: 16px; margin-bottom: 25px;">
          Thank you for contacting <strong>Miima Surveying & Geomatics</strong>. We have received your inquiry regarding:
        </p>
        
        <!-- Subject Box -->
        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 5px solid #2c5aa0; margin: 25px 0;">
          <p style="margin: 0; color: #1e3a5f; font-size: 18px; font-weight: 600;">"${subject}"</p>
        </div>
        
              
        <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 5px solid #2c5aa0; margin: 25px 0;">
          <h3 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 20px;">⏱️ What happens next?</h3>
          <div style="color: #555; line-height: 1.8; font-size: 15px;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
              <span style="background: #2c5aa0; color: white; min-width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; font-weight: bold;">1</span>
              <span>Our team will review your message within <strong>24 hours</strong></span>
            </div>
            <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
              <span style="background: #2c5aa0; color: white; min-width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; font-weight: bold;">2</span>
              <span>We'll respond with the information you need or next steps</span>
            </div>
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #2c5aa0; color: white; min-width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; font-weight: bold;">3</span>
              <span>Feel free to call us if you need immediate assistance</span>
            </div>
          </div>
        </div>
        
        <!-- Contact Buttons -->
        <div style="text-align: center; margin: 35px 0 25px 0;">
          <a href="tel:+12014567411" 
             style="background: #2c5aa0; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(44,90,160,0.3);">
            📞 Call: (201) 456-7411
          </a>
          <a href="mailto:info@msurveyinggeomatics.com" 
             style="background: #28a745; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">
            ✉️ Email Us
          </a>
        </div>
        
        <!-- Company Info -->
        <div style="background: #e8f4ff; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
          <h4 style="color: #1e3a5f; margin: 0 0 15px 0;">Why Choose Miima Surveying & Geomatics?</h4>
          <div style="color: #555; font-size: 14px; line-height: 1.6;">
            <strong>40+ Years Experience</strong> • <strong>Licensed in NJ</strong> • <strong>Latest Technology</strong><br>
             <strong>Competitive Pricing</strong> •  <strong>Professional Service</strong> • <strong>Timely Delivery</strong>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e9ecef; text-align: center;">
          <p style="color: #666; margin: 0; font-size: 14px; line-height: 1.6;">
            <strong>Miima Surveying & Geomatics LLC</strong><br>
            12-14 Elm St, Unit 13, Montclair, NJ 07042<br>
            Licensed • Insured • Professional • Trusted
          </p>
        </div>
      </div>
    </div>
  `;

  const textBody = `
Hi ${name},

Thank you for contacting Miima Surveying & Geomatics regarding "${subject}".


WHAT HAPPENS NEXT:
• Our team will review your message within 24 hours
• We'll respond with the information you need or next steps
• Feel free to call us if you need immediate assistance

CONTACT US:
Phone: (201) 456-7411
Email: info@msurveyinggeomatics.com
Address: 12-14 Elm St, Unit 13, Montclair, NJ 07042
Website: msurveyingeomatics.com

With 40+ years of experience and university-level expertise, we're committed to delivering precise, reliable surveying services.

— Miima Surveying & Geomatics LLC
Licensed • Insured • Professional • Trusted
  `;

  return transporter.sendMail({
    from: `"Miima Surveying & Geomatics" <${FROM_EMAIL || SMTP_USER}>`,
    to,
    replyTo: "dorcaskirwa97@gmail.com",
    subject: `We received your message. Miima Surveying Geomatics`,
    text: textBody,
    html: htmlBody,
  });
}

// // Sending bank details to customer
// export function sendBankDetailsToCustomer({ to, name, amount, invoice }) {
//   const amt = Number(amount || 0).toFixed(2);
//   const details = (BANK_DETAILS_TEXT || 'Bank details on request.')
//     .replace(/\\n/g, '\n');

//   const text =
// `Hi ${name || ''},

// Here are our bank transfer details:

// ${details}

// Reference: ${invoice || '(please include your invoice #)'}
// Amount: $${amt}

// — MIIMA Surveying & Geomatics`;

//   const html =
// `<p>Hi ${name || ''},</p>
// <p>Here are our bank transfer details:</p>
// <pre style="background:#f8fafc;border:1px solid #eef2f6;padding:12px;border-radius:8px;white-space:pre-wrap">${details}</pre>
// <p><strong>Reference:</strong> ${invoice || '(please include your invoice #)'}<br/>
// <strong>Amount:</strong> $${amt}</p>
// <p>— MIIMA Surveying & Geomatics</p>`;

//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to,
//     subject: `Bank transfer details — ${invoice || 'Survey Payment'}`,
//     text, html
//   });
// }

// export function notifyTeamBankDetailsSent({ email, amount, invoice }) {
//   const amt = Number(amount || 0).toFixed(2);
//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to: TEAM,
//     subject: `Bank details sent to ${email} — ${invoice || ''}`,
//     text: `Amount: $${amt}\nInvoice: ${invoice || ''}\nCustomer: ${email}`
//   });
// }

// //  Zelle
// export function notifyTeamZelle({ email, name, amount, invoice }) {
//   const amt = Number(amount || 0).toFixed(2);
//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to: TEAM,
//     replyTo: `${name || 'Customer'} <${email}>`,
//     subject: `ZELLE: ${invoice || ''} — $${amt}`,
//     text:
// `Customer: ${name || 'Customer'} <${email}>
// Invoice: ${invoice || ''}
// Amount: $${amt}

// Reports paying via Zelle. Please reconcile when received.`
//   });
// }

// export function ackCustomerZelle({ to, name, invoice, amount }) {
//   const amt = Number(amount || 0).toFixed(2);
//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to,
//     subject: `We received your Zelle notice — ${invoice}`,
//     text:
// `Thanks ${name || ''},

// We received your Zelle notice for invoice ${invoice} ($${amt}).
// We’ll confirm once matched on our end.

// — MIIMA Surveying & Geomatics`
//   });
// }

// // Bank
// export function notifyTeamBankNotice({
//   email, name, amount, invoice, transferRef, bankName, transferDate,
//   proofBuffer, proofFilename, proofMime
// }) {
//   const amt = Number(amount || 0).toFixed(2);

//   const attachments = [];
//   if (proofBuffer && proofFilename) {
//     attachments.push({
//       filename: proofFilename,
//       content: proofBuffer,
//       contentType: proofMime || 'application/octet-stream'
//     });
//   }

//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to: TEAM,
//     replyTo: `${name || 'Customer'} <${email}>`,
//     subject: `BANK NOTICE: ${invoice || ''} — $${amt}`,
//     text:
// `Bank transfer notice received.

// Invoice: ${invoice || ''}
// Amount: $${amt}
// Customer: ${name || 'Customer'} <${email}>
// Reference: ${transferRef || '-'}
// Bank: ${bankName || '-'}
// Date: ${transferDate || '-'}

// Please reconcile when funds appear.`,
//     attachments
//   });
// }

// export function ackCustomerBankNotice({ to, name, invoice, amount, transferRef, bankName, transferDate }) {
//   const amt = Number(amount || 0).toFixed(2);
//   return transporter.sendMail({
//     from: FROM_EMAIL || SMTP_USER,
//     to,
//     subject: `We received your bank transfer notice — ${invoice}`,
//     text:
// `Thanks ${name || ''},

// We received your bank transfer notice for ${invoice} ($${amt}).
// Ref: ${transferRef || '-'} ${bankName ? ' • Bank: ' + bankName : ''} ${transferDate ? ' • Date: ' + transferDate : ''}

// We’ll confirm once funds clear (usually 1–3 business days).

// — MIIMA Surveying & Geomatics`
//   });
// }
