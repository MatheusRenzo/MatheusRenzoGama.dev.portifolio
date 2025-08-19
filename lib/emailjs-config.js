// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
  
  // Your EmailJS Service ID
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
  
  // Your EmailJS Template ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
  
  // Template Parameters
  TEMPLATE_PARAMS: {
    to_name: 'Matheus Renzo',
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  }
};

// EmailJS Template Example:
/*
Template Name: Portfolio Contact Form
Template ID: YOUR_TEMPLATE_ID

Subject: [PORTFOLIO] {{subject}}

Message:
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Timestamp: {{timestamp}}
*/

// Setup Instructions:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Add your email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Replace the values above with your actual credentials
// 6. Update the Contact component to use these values

export const initializeEmailJS = () => {
  if (typeof window !== 'undefined' && window.emailjs) {
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
};

export const sendEmail = async (templateParams) => {
  if (typeof window !== 'undefined' && window.emailjs) {
    try {
      const response = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, error };
    }
  } else {
    return { success: false, error: 'EmailJS not loaded' };
  }
};
