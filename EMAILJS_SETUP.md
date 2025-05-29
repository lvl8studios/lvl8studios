# EmailJS Setup Guide

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set up Email Service

1. Go to the **Email Services** tab in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID** (you'll need this for the .env file)

## 3. Create Email Template

1. Go to the **Email Templates** tab
2. Click **Create New Template**
3. Use the following template structure:

```html
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent through the contact form on {{to_name}} website.
```

4. Save the template and copy the **Template ID**

## 4. Get Public Key

1. Go to the **Account** tab in your EmailJS dashboard
2. Copy your **Public Key**

## 5. Update Environment Variables

Update your `.env.local` file with the actual values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test the Form

1. Start your development server: `bun dev`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email for the message

## Template Variables Available

The form sends these variables to EmailJS:
- `from_name`: The sender's name from the form
- `from_email`: The sender's email from the form
- `message`: The message content from the form
- `to_name`: Your company name (automatically filled)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 1 email service
- 1 email template
- Basic email delivery tracking

For production use with higher volume, consider upgrading to a paid plan.
