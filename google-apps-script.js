/**
 * Aqua Sort Beta Tester Sign-up — Google Apps Script Backend
 * 
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com
 * 2. Create a new project, paste this code
 * 3. Click "Deploy" > "New Deployment"
 * 4. Type: "Web App", Execute as: "Me", Who has access: "Anyone"
 * 5. Copy the Web App URL
 * 6. Paste the URL into index.html where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

const SHEET_NAME = 'Beta Testers';
const SPREADSHEET_ID = ''; // Leave empty to auto-create, or paste your Google Sheet ID here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'WhatsApp', 'Device',
        'Play Frequency', 'Hours/Week', 'Source', 'Genres',
        'Excitement (1-5)', 'Favorite Feature', 'Motivation', 'Suggestions'
      ]);
      sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#00d4e8');
    }
    
    // Append the row
    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.device || '',
      data.freq || '',
      data.hours || '',
      data.source || '',
      data.genres || '',
      data.excitement || '',
      data.feature || '',
      data.motivation || '',
      data.suggestions || ''
    ]);

    // Optional: Send welcome email
    if (data.email) {
      sendWelcomeEmail(data.email, data.name);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Aqua Sort Beta Signup API is running 🎮' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendWelcomeEmail(email, name) {
  const firstName = name ? name.split(' ')[0] : 'Tester';
  const subject = '🎉 Your Aqua Sort Beta Access is Here!';
  
  // Update these links with your actual URLs
  const playStoreLink = 'https://play.google.com/apps/testing/com.webspiderstudios.aquasort';
  const whatsappLink = 'YOUR_WHATSAPP_GROUP_LINK';
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
      <h2 style="color: #0f172a;">Hi ${firstName}! 👋</h2>
      <p>Welcome to the Aqua Sort Beta Squad! 🎮💧</p>
      <p>Your application has been successfully processed. You are now officially on our tester list. Let's get you set up!</p>
      
      <div style="margin: 30px 0; padding: 24px; background: #f8fafc; border-radius: 12px; border-left: 5px solid #15d6c8;">
        <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">1️⃣ Download the Game</h3>
        <p style="margin-bottom: 20px;">Use the secure Google Play testing link below to opt-in to the beta and download the game to your Android device:</p>
        <a href="${playStoreLink}" style="background: #15d6c8; color: #0f172a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Download on Google Play</a>
      </div>

      <div style="margin: 30px 0; padding: 24px; background: #f8fafc; border-radius: 12px; border-left: 5px solid #25D366;">
        <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">2️⃣ Join the Community</h3>
        <p style="margin-bottom: 20px;">Join our private Beta Testers WhatsApp group to share feedback, report bugs, and chat directly with the developer.</p>
        <a href="${whatsappLink}" style="background: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Join WhatsApp Group</a>
      </div>

      <p>In the meantime, warm up your puzzle-solving brain — the tubes won't sort themselves! 😄</p>
      <br>
      <p>With water-themed enthusiasm 💧,<br><strong>The WebSpider Studios Team</strong></p>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    console.log('Email send failed:', e.message);
  }
}
