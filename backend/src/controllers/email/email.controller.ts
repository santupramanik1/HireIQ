import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Request, Response } from 'express';

const resend = new Resend(process.env.RESEND_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (req: Request, res: Response) => {
  try {
    // Accept the DATA from the frontend, not the HTML
    const {
      to,
      subject,
      candidateName,
      interviewType,
      jobTitle,
      interviewLink,
    } = req.body;

    if (!to || !subject) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing "to" or "subject"' });
    }

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'interview-invite.html'
    );

    // Make sure your path matches your actual folder structure!
    // If your templates are just in the root 'templates' folder, remove 'src'.

    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Replace the placeholders with the real data
    htmlTemplate = htmlTemplate.replace(
      /{{CANDIDATE_NAME}}/g,
      candidateName || 'Candidate'
    );
    htmlTemplate = htmlTemplate.replace(
      /{{INTERVIEW_TYPE}}/g,
      interviewType || 'Technical Interview'
    );
    htmlTemplate = htmlTemplate.replace(
      /{{JOB_TITLE}}/g,
      jobTitle || 'Open Position'
    );
    htmlTemplate = htmlTemplate.replace(
      /{{INTERVIEW_LINK}}/g,
      interviewLink || '#'
    );

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'HireIQ <hireiq@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: htmlTemplate,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to send email',
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Email sent successfully', data });
  } catch (error: any) {
    console.error('Server Error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};
