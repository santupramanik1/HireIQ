// import { Resend } from 'resend';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const resend = new Resend(process.env.RESEND_API_KEY);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// interface EmailInviteParams {
//   to: string;
//   candidateName: string;
//   interviewType: string;
//   jobTitle: string;
//   interviewLink: string;
// }

// export const sendInterviewInviteEmail = async (params: EmailInviteParams) => {
//   try {
//     const templatePath = path.join(
//       process.cwd(),
//       'src',
//       'templates',
//       'interview-invite.html'
//     );
//     let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

//     // Replace placeholders
//     htmlTemplate = htmlTemplate.replace(
//       /{{CANDIDATE_NAME}}/g,
//       params.candidateName
//     );
//     htmlTemplate = htmlTemplate.replace(
//       /{{INTERVIEW_TYPE}}/g,
//       params.interviewType
//     );
//     htmlTemplate = htmlTemplate.replace(/{{JOB_TITLE}}/g, params.jobTitle);
//     htmlTemplate = htmlTemplate.replace(
//       /{{INTERVIEW_LINK}}/g,
//       params.interviewLink
//     );


//     const { data, error } = await resend.emails.send({
//       from: 'HireIQ <hireiq@resend.dev>', // Ensure you have this domain verified in Resend
//       to: params.to,
//       subject: `Interview Invitation: ${params.jobTitle} at HireIQ`,
//       html: htmlTemplate,
//     });

//     if (error) throw new Error(error.message);
//     return data;
//   } catch (error) {
//     console.error('Email Service Error:', error);
//     throw error;
//   }
// };


import { BrevoClient } from '@getbrevo/brevo';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Initialize Brevo Client
const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY as string, 
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EmailInviteParams {
  to: string;
  candidateName: string;
  interviewType: string;
  jobTitle: string;
  interviewLink: string;
}

export const sendInterviewInviteEmail = async (params: EmailInviteParams): Promise<any> => {
  try {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'interview-invite.html'
    );
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders
    htmlTemplate = htmlTemplate.replace(
      /{{CANDIDATE_NAME}}/g,
      params.candidateName
    );
    htmlTemplate = htmlTemplate.replace(
      /{{INTERVIEW_TYPE}}/g,
      params.interviewType
    );
    htmlTemplate = htmlTemplate.replace(/{{JOB_TITLE}}/g, params.jobTitle);
    htmlTemplate = htmlTemplate.replace(
      /{{INTERVIEW_LINK}}/g,
      params.interviewLink
    );

 
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: `Interview Invitation: ${params.jobTitle} at HireIQ`,
      htmlContent: htmlTemplate,
      sender: { 
        name: 'HireIQ Support', 
        email: 'santu700141@gmail.com'
      },
      to: [{ 
        email: params.to,
        name: params.candidateName 
      }],
    });

    return result;
  } catch (error) {
    console.error('Email Service Error:', error);
    throw error;
  }
};