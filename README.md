# Smart India Hackathon Registration System

A React-based registration system for the Smart India Hackathon at MES Mukunddas Lohia College of Engineering, Pune. This system features division-based team registration with integrated Google Sheets data collection and WhatsApp group integration.

## 🌟 Features

### Registration Form
- **College-branded interface** with MES College logo
- **Responsive design** that works seamlessly on mobile, tablet, and desktop
- **Division-based registration** (A, B, C) with automatic team assignment
- **Real-time validation** for roll numbers (25AXX, 25BXX, 25CXX format)
- **Team management** - up to 6 members (1 leader + 5 members)
- **Smart form validation** with visual feedback
- **Division-specific WhatsApp groups** - automatic group link after registration

### Data Collection
- **Google Sheets integration** for persistent data storage
- **Automatic timestamp** for each registration
- **Division tracking** for all team members
- **Complete team information** including problem statements and technology stack

### User Experience
- Clean, modern UI with professional styling
- Form field dependencies (division selection enables roll number validation)
- Success page with division-specific WhatsApp group invitation
- About page with developer credits
- Mobile-optimized layout

## 📋 Form Fields

### Team Information
1. **Team Name** (required)
2. **Group Leader's Name** (required)
3. **Group Leader's Division** (A/B/C) (required)
4. **Group Leader's Roll No** (25AXX format based on division) (required)

### Team Members (Optional - up to 5)
- Member Name
- Member Roll No (must match leader's division format)

### Project Details
5. **Problem Statement** from SIH website (required)
6. **Problem Statement Number** (required)
7. **Project Domain** - 19 options including:
   - Agriculture
   - MedTech/BioTech/HealthTech
   - Blockchain & Cybersecurity
   - Smart Education
   - And 15+ more domains
8. **Technology to be Used** (required)
9. **Sector** (Public/Government/Semi-Government/Private) (required)
10. **Dream Companies** (4 companies, comma-separated) (required)

## 🚀 Setup Instructions

### Prerequisites
- Web browser (Chrome, Firefox, Safari, or Edge)
- Google account for Google Sheets integration
- WhatsApp groups created for each division

### Quick Start

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd sih-hackathon-registration
   ```

2. **Open `index.html` in a web browser**
   - No build process required!
   - Works directly from local file system or web server

3. **Configure Google Sheets** (see below)

4. **Deploy to GitHub Pages** (optional)

## 🔧 Google Sheets Integration Setup

### Step 1: Create Google Sheet

1. Create a new Google Sheet
2. Name it "SIH Hackathon Registrations 2025"
3. Add these column headers in Row 1:
   ```
   A: Timestamp
   B: Team Name
   C: Leader Name
   D: Leader Roll No
   E: Leader Division
   F: Member 1 Name
   G: Member 1 Roll No
   H: Member 1 Division
   (Repeat for Members 2-5)
   U: Problem Statement
   V: Problem Statement No
   W: Domain
   X: Technology
   Y: Sector
   Z: Dream Companies
   ```

### Step 2: Create Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete existing code and paste:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    var row = [
      new Date(),
      data.teamName || '',
      data.leaderName || '',
      data.leaderRollNo || '',
      data.leaderDivision || '',
      data.member1Name || '',
      data.member1RollNo || '',
      data.member1Division || '',
      data.member2Name || '',
      data.member2RollNo || '',
      data.member2Division || '',
      data.member3Name || '',
      data.member3RollNo || '',
      data.member3Division || '',
      data.member4Name || '',
      data.member4RollNo || '',
      data.member4Division || '',
      data.member5Name || '',
      data.member5RollNo || '',
      data.member5Division || '',
      data.problemStatement || '',
      data.problemStatementNo || '',
      data.domain || '',
      data.technology || '',
      data.sector || '',
      data.dreamCompanies || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Script is running! Use POST method to submit data.');
}
```

3. Click **Save**
4. Click **Deploy** → **New deployment**
5. Select type: **Web app**
6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and authorize
8. Copy the **Web App URL**

### Step 3: Update index.html

In `index.html`, find line ~197 and replace the URL:
```javascript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
```

With your actual URL:
```javascript
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
```

## 📱 WhatsApp Group Integration

### Configure WhatsApp Links

In `index.html`, find the `whatsappLinks` object (around line 47) and update with your group links:

```javascript
const whatsappLinks = {
    'A': 'https://chat.whatsapp.com/YOUR_DIVISION_A_LINK',
    'B': 'https://chat.whatsapp.com/YOUR_DIVISION_B_LINK',
    'C': 'https://chat.whatsapp.com/YOUR_DIVISION_C_LINK'
};
```

### How It Works
- After successful registration, users see a success page
- A division-specific WhatsApp group link is displayed
- Clicking the button opens the correct WhatsApp group
- All team members are encouraged to join

## 🎨 Customization

### Update College Logo
In `index.html`, replace the logo URL:
```html
<img src="YOUR_LOGO_URL" alt="College Logo" className="logo" />
```

### Modify Colors
In `styles.css`, update CSS variables:
```css
:root {
    --primary-color: #003366;    /* Deep blue */
    --secondary-color: #FF6B35;  /* Orange */
    --accent-color: #F1C40F;     /* Yellow */
}
```

### Add/Remove Form Fields
Edit the form in `index.html` and update the `formData` state and `payload` object accordingly.

## 📱 Roll Number Validation

The system enforces division-specific roll number formats:

- **Division A**: `25A01` to `25A99`
- **Division B**: `25B01` to `25B99`
- **Division C**: `25C01` to `25C99`

### Features:
- Real-time validation with visual feedback
- Green checkmark for valid format
- Red error message for invalid format
- Member roll numbers must match leader's division
- Fields disabled until division is selected

## 🌐 Deployment

### GitHub Pages

1. Create a GitHub repository
2. Upload files: `index.html`, `styles.css`, `README.md`
3. Go to **Settings** → **Pages**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://username.github.io/repo-name/`

### Other Hosting Options
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **Any web server**: Upload files directly

## 🛠️ Technologies Used

- **React 18** (via CDN) - UI components and state management
- **Babel Standalone** - In-browser JSX transformation
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Flexbox and Grid for responsive layout
- **Google Apps Script** - Backend integration
- **Google Sheets** - Data storage
- **WhatsApp** - Group communication

## 📂 Project Structure

```
.
├── index.html          # Main application (React components, logic, form)
├── styles.css          # Styling and responsive design
├── README.md           # This file
└── script.js           # Legacy file (not used, can be deleted)
```

## 🎯 Key Features Explained

### Division-Based Team Management
- Leader selects division (A, B, or C)
- All team members automatically assigned to same division
- Roll numbers must match division format
- Division-specific WhatsApp group assigned

### Smart Validation
- Required fields clearly marked with *
- Real-time validation feedback
- Form won't submit with invalid data
- Clear error messages guide users

### Success Flow
1. User fills form → 2. Validates input → 3. Submits to Google Sheets → 4. Success page appears → 5. WhatsApp group link shown → 6. User joins group

## 👥 Developer Credits

This registration system was developed by:
- 🚀 **Prathamesh Bhujbal**
- 💻 **Ayush Nimbhare**
- 🔧 **Govind Gandhi**
- 🎨 **Atharv Chougule**

## 📞 Support

For issues or questions:
1. Check the success page after registration
2. Join your division's WhatsApp group
3. Contact the development team through the group

## 📄 License

This project is for educational use at MES Mukunddas Lohia College of Engineering, Pune.

## 🔄 Version History

**v2.0** (Current)
- Added division-based registration
- Implemented roll number validation (25AXX format)
- Integrated WhatsApp group links
- Enhanced success page
- Improved mobile responsiveness
- Added logo background for better visibility

**v1.0** (Initial)
- Basic registration form
- Google Sheets integration
- Responsive design

---

**Built with ❤️ for Smart India Hackathon 2025**