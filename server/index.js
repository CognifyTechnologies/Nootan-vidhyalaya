require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'admissions.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Configure nodemailer transporter
function createTransporter() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  // Fallback to custom SMTP host if configured
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  return null;
}

// Generate styled HTML email for Nootan Vidhyalaya
function generateAdmissionEmailHtml(appData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
      .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
      .header { background: linear-gradient(135deg, #071e3d 0%, #1a4a84 100%); color: #ffffff; padding: 25px 20px; text-align: center; }
      .header h1 { margin: 0 0 6px 0; font-size: 22px; letter-spacing: 0.5px; }
      .header p { margin: 0; font-size: 13px; color: #fde047; font-weight: bold; }
      .sub-header { background: #ffedd5; color: #c2410c; padding: 10px; text-align: center; font-size: 14px; font-weight: 600; border-bottom: 2px solid #fed7aa; }
      .content { padding: 25px; }
      .meta-box { display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; }
      .section-title { font-size: 15px; font-weight: 700; color: #0f3460; border-left: 4px solid #f59e0b; padding-left: 10px; margin: 20px 0 10px 0; text-transform: uppercase; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      th, td { padding: 10px 12px; text-align: left; font-size: 13.5px; border-bottom: 1px solid #f1f5f9; }
      th { width: 38%; color: #64748b; font-weight: 600; background: #fafafa; }
      td { color: #0f172a; font-weight: 500; }
      .highlight { color: #1d4ed8; font-weight: 700; }
      .footer { background: #071e3d; color: #94a3b8; text-align: center; padding: 18px; font-size: 12px; }
      .footer p { margin: 3px 0; }
      .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; background: #dbeafe; color: #1e40af; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>શ્રી નૂતન વિદ્યાલય કરણનગર</h1>
        <p>॥ કર ભલા હોગા ભલા ॥</p>
        <div style="font-size: 11px; margin-top: 5px; color: #cbd5e1;">કરણનગર, તા. કડી, જી. મહેસાણા (ઉત્તર ગુજરાત)</div>
      </div>

      <div class="sub-header">
        🔔 નવી ઓનલાઇન પ્રવેશ અરજી (New Admission Application)
      </div>

      <div class="content">
        <div class="meta-box">
          <div><strong>અરજી ક્રમાંક:</strong> <span class="badge">${appData.id || 'N/A'}</span></div>
          <div><strong>તારીખ:</strong> ${new Date(appData.submittedAt || Date.now()).toLocaleString('gu-IN', { timeZone: 'Asia/Kolkata' })}</div>
        </div>

        <div class="section-title">૧. વિદ્યાર્થીની માહિતી (Student Information)</div>
        <table>
          <tr><th>વિદ્યાર્થીનું પૂરું નામ</th><td class="highlight">${appData.studentName}</td></tr>
          <tr><th>જન્મ તારીખ</th><td>${appData.dob}</td></tr>
          <tr><th>જાતિ (Gender)</th><td>${appData.gender}</td></tr>
          <tr><th>પ્રવેશ લેવાનું ધોરણ</th><td class="highlight">${appData.standard}</td></tr>
          <tr><th>શૈક્ષણિક વર્ષ</th><td>${appData.academicYear}</td></tr>
        </table>

        <div class="section-title">૨. વાલી / માતા-પિતાની માહિતી (Parent/Guardian Information)</div>
        <table>
          <tr><th>પિતાનું નામ</th><td>${appData.fatherName}</td></tr>
          <tr><th>માતાનું નામ</th><td>${appData.motherName}</td></tr>
          <tr><th>મોબાઇલ નંબર</th><td class="highlight"><a href="tel:${appData.mobile}" style="color: #2563eb; text-decoration: none;">${appData.mobile}</a></td></tr>
          <tr><th>ઈમેલ સરનામું</th><td>${appData.email || 'ઉલ્લેખ નથી (N/A)'}</td></tr>
          <tr><th>રહેઠાણનું પૂરું સરનામું</th><td>${appData.address}</td></tr>
        </table>

        <div class="section-title">૩. અગાઉની શાળાની માહિતી (Previous School Information)</div>
        <table>
          <tr><th>અગાઉની શાળાનું નામ</th><td>${appData.prevSchoolName || 'N/A'}</td></tr>
          <tr><th>અગાઉનું ધોરણ</th><td>${appData.prevStandard || 'N/A'}</td></tr>
          <tr><th>શાળાનું બોર્ડ</th><td>${appData.prevBoard || 'N/A'}</td></tr>
        </table>

        <div class="section-title">૪. વધારાની માહિતી (Additional Information)</div>
        <table>
          <tr><th>શાળા વિશે ક્યાંથી જાણવા મળ્યું?</th><td>${appData.hearAbout || 'N/A'}</td></tr>
          <tr><th>અન્ય કોઈ સૂચન અથવા સંદેશ</th><td>${appData.suggestion || 'કોઈ ખાસ સંદેશ નથી.'}</td></tr>
        </table>
      </div>

      <div class="footer">
        <p><strong>નૂતન વિદ્યાલય કરણનગર - ઓનલાઇન પ્રવેશ પ્રણાલી</strong></p>
        <p>આ ઈમેલ આપોઆપ મોકલાયેલ છે. શાળા એડમિન પોર્ટલમાં પણ આ અરજી સુરક્ષિત રીતે સંગ્રહિત થયેલ છે.</p>
        <p>સંપર્ક ઈમેલ: dilippatel1979@gmail.com | કરણનગર, કડી, મહેસાણા</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    school: 'Nootan Vidhyalaya Karannagar',
    targetEmail: 'dilippatel1979@gmail.com',
    time: new Date().toISOString()
  });
});

// GET all admission applications
app.get('/api/admissions', (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list = JSON.parse(raw);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new admission application
app.post('/api/admission', async (req, res) => {
  const { application } = req.body;
  const targetRecipient = req.body.recipient || 'dilippatel1979@gmail.com';

  if (!application || !application.studentName || !application.mobile) {
    return res.status(400).json({
      success: false,
      error: 'Missing required admission fields (studentName, mobile).'
    });
  }

  // Ensure ID and timestamp
  const record = {
    ...application,
    id: application.id || `NV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: application.submittedAt || new Date().toISOString(),
    status: application.status || 'Pending'
  };

  // 1. Save to JSON database
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list = JSON.parse(raw);
    list.unshift(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save to local database:', err);
  }

  // 2. Send email via Nodemailer
  const transporter = createTransporter();
  let emailSent = false;
  let emailInfo = null;
  let previewMode = false;

  const mailOptions = {
    from: process.env.SMTP_FROM || `"નૂતન વિદ્યાલય કરણનગર" <no-reply@nootanvidhyalaya.edu.in>`,
    to: targetRecipient,
    subject: `નવું ઓનલાઇન પ્રવેશ ફોર્મ: ${record.studentName} (${record.standard}) - નૂતન વિદ્યાલય કરણનગર [${record.id}]`,
    html: generateAdmissionEmailHtml(record)
  };

  if (transporter) {
    try {
      emailInfo = await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`[EMAIL DISPATCHED] Successfully sent admission application ${record.id} to ${targetRecipient}`);
    } catch (sendErr) {
      console.error('[EMAIL ERROR] Failed to send via transporter:', sendErr.message);
    }
  } else {
    // If SMTP credentials aren't set in .env yet, write out a formatted preview log
    previewMode = true;
    console.log(`\n============================================================`);
    console.log(`[ADMISSION DISPATCH SERVICE] TARGET: ${targetRecipient}`);
    console.log(`[APPLICATION ID]: ${record.id}`);
    console.log(`[STUDENT]: ${record.studentName} | STD: ${record.standard}`);
    console.log(`[PARENT]: ${record.fatherName} | PHONE: ${record.mobile}`);
    console.log(`[ADDRESS]: ${record.address}`);
    console.log(`To enable live Gmail delivery, add SMTP_USER & SMTP_PASS in server/.env`);
    console.log(`============================================================\n`);
  }

  res.json({
    success: true,
    applicationId: record.id,
    emailSent: emailSent || previewMode,
    previewMode,
    recipient: targetRecipient,
    message: `પ્રવેશ અરજી સફળતાપૂર્વક સ્વીકારવામાં આવી છે અને ${targetRecipient} પર મોકલાઈ છે.`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Nootan Vidhyalaya Admission Server running on port ${PORT}`);
  console.log(`📧 Configured Destination Email: dilippatel1979@gmail.com`);
});

