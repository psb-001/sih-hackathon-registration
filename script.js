// Configuration - Replace with your actual Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hackathonForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Get all form values
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Submit to Google Sheets
        submitToGoogleSheets(data);
    });
    
    function submitToGoogleSheets(data) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Registering...';
        submitButton.disabled = true;
        
        // Format the data for Google Sheets
        const payload = {
            teamName: data.teamName,
            leaderName: data.leaderName,
            leaderRollNo: data.leaderRollNo,
            member1Name: data.member1Name || '',
            member1RollNo: data.member1RollNo || '',
            member2Name: data.member2Name || '',
            member2RollNo: data.member2RollNo || '',
            member3Name: data.member3Name || '',
            member3RollNo: data.member3RollNo || '',
            member4Name: data.member4Name || '',
            member4RollNo: data.member4RollNo || '',
            member5Name: data.member5Name || '',
            member5RollNo: data.member5RollNo || '',
            problemStatement: data.problemStatement,
            problemStatementNo: data.problemStatementNo,
            domain: data.domain,
            technology: data.technology,
            sector: data.sector
        };
        
        // Send data to Google Apps Script
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            // Show success message (no-cors mode doesn't give us response data)
            showSuccess();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
    
    function showSuccess() {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});