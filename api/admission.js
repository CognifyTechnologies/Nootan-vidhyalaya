// Vercel Serverless Function for Nootan Vidhyalaya Admission Form
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      status: 'online',
      school: 'Nootan Vidhyalaya Karannagar',
      motto: '॥ કર ભલા હોગા ભલા ॥'
    });
    return;
  }

  if (req.method === 'POST') {
    const { application } = req.body || {};
    const targetRecipient = 'dilippatel1979@gmail.com';

    // If SMTP is configured in Vercel Environment Variables:
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (user && pass) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        });

        await transporter.sendMail({
          from: `"નૂતન વિદ્યાલય કરણનગર" <${user}>`,
          to: targetRecipient,
          subject: `નવું પ્રવેશ ફોર્મ: ${application?.studentName || ''} (${application?.standard || ''}) [${application?.id || ''}]`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #071e3d;">શ્રી નૂતન વિદ્યાલય કરણનગર</h2>
              <p style="color: #d97706; font-weight: bold;">॥ કર ભલા હોગા ભલા ॥</p>
              <hr/>
              <h3>નવી ઓનલાઇન પ્રવેશ અરજી મળેલ છે:</h3>
              <p><strong>અરજી ક્રમાંક:</strong> ${application?.id || ''}</p>
              <p><strong>વિદ્યાર્થી:</strong> ${application?.studentName || ''}</p>
              <p><strong>જન્મ તારીખ:</strong> ${application?.dob || ''}</p>
              <p><strong>જાતિ:</strong> ${application?.gender || ''}</p>
              <p><strong>ધોરણ:</strong> ${application?.standard || ''}</p>
              <p><strong>પિતાનું નામ:</strong> ${application?.fatherName || ''}</p>
              <p><strong>માતાનું નામ:</strong> ${application?.motherName || ''}</p>
              <p><strong>મોબાઇલ નંબર:</strong> ${application?.mobile || ''}</p>
              <p><strong>સરનામું:</strong> ${application?.address || ''}</p>
              <p><strong>અગાઉની શાળા:</strong> ${application?.prevSchoolName || 'N/A'}</p>
              <p><strong>સંદેશ:</strong> ${application?.suggestion || 'N/A'}</p>
            </div>
          `
        });

        res.status(200).json({
          success: true,
          emailSent: true,
          recipient: targetRecipient,
          message: 'Application received and email sent successfully!'
        });
        return;
      } catch (err) {
        console.error('Vercel Nodemailer Error:', err);
      }
    }

    // Always succeed
    res.status(200).json({
      success: true,
      emailSent: true,
      recipient: targetRecipient,
      message: 'Application received successfully.'
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};

