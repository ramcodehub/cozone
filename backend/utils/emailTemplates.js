/**
 * Email Templates for CoZone Platform
 */

const primaryColor = '#25B7A3'; // Teal
const secondaryColor = '#0138ED'; // Dark Blue
const backgroundColor = '#F5F5F7'; // Warm Gray
const textColor = '#222222';
const white = '#FFFFFF';

/**
 * Base template wrapper to provide consistent styling
 */
const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: ${textColor};
            margin: 0;
            padding: 0;
            background-color: ${backgroundColor};
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: ${white};
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .header {
            background-color: ${primaryColor};
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            color: ${white};
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
        }
        .content {
            padding: 30px;
        }
        .info-box {
            background-color: ${backgroundColor};
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .info-item {
            margin-bottom: 12px;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 8px;
        }
        .info-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .label {
            font-weight: bold;
            color: ${secondaryColor};
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .value {
            font-size: 16px;
        }
        .message-box {
            background-color: #fff;
            border-left: 4px solid ${primaryColor};
            padding: 15px;
            font-style: italic;
            margin-top: 10px;
        }
        .footer {
            background-color: #222;
            color: #888;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 15px;
            background-color: ${primaryColor};
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CoZone</h1>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} CoZone Coworking Space. All rights reserved.</p>
            <p>Unit No: 7th Floor, Asian Sun City, B Block, Kondapur, Hyderabad</p>
            <p>Contact: +91 9458222234 | Email: cozonehyd@gmail.com</p>
        </div>
    </div>
</body>
</html>
`;

/**
 * Template for Contact Form submissions
 */
export const contactFormTemplate = (data) => {
    const { fullName, email, phone, companyName, message } = data;
    
    const content = `
        <div class="badge">New Contact Inquiry</div>
        <p>Hello Admin,</p>
        <p>You have received a new message through the general contact form on the CoZone website.</p>
        
        <div class="info-box">
            <div class="info-item">
                <span class="label">Full Name</span>
                <span class="value">${fullName}</span>
            </div>
            <div class="info-item">
                <span class="label">Email Address</span>
                <span class="value">${email}</span>
            </div>
            <div class="info-item">
                <span class="label">Phone Number</span>
                <span class="value">${phone || 'Not provided'}</span>
            </div>
            <div class="info-item">
                <span class="label">Company Name</span>
                <span class="value">${companyName || 'Not provided'}</span>
            </div>
        </div>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 10px;">Message:</h3>
        <div class="message-box">
            "${message}"
        </div>
        
        <p style="margin-top: 30px;">Please respond to this inquiry as soon as possible.</p>
    `;
    
    return baseTemplate(`Contact Inquiry: ${fullName}`, content);
};

/**
 * Template for Service Enquiry submissions
 */
export const serviceEnquiryTemplate = (data) => {
    const { fullName, mobile, email, service, message } = data;
    
    const content = `
        <div class="badge" style="background-color: ${secondaryColor};">New Service Enquiry</div>
        <p>Hello Admin,</p>
        <p>A new enquiry has been submitted for a specific service: <strong>${service}</strong>.</p>
        
        <div class="info-box">
            <div class="info-item">
                <span class="label">Service Requested</span>
                <span class="value" style="color: ${secondaryColor}; font-weight: bold;">${service}</span>
            </div>
            <div class="info-item">
                <span class="label">Full Name</span>
                <span class="value">${fullName}</span>
            </div>
            <div class="info-item">
                <span class="label">Email Address</span>
                <span class="value">${email}</span>
            </div>
            <div class="info-item">
                <span class="label">Mobile Number</span>
                <span class="value">${mobile}</span>
            </div>
        </div>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 10px;">Inquiry Details:</h3>
        <div class="message-box">
            "${message || 'No additional details provided.'}"
        </div>
        
        <p style="margin-top: 30px;">This lead is waiting for your response.</p>
    `;
    
    return baseTemplate(`Service Enquiry: ${service} from ${fullName}`, content);
};
