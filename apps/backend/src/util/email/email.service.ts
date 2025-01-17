import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new Error('SendGrid API key is not set in environment variables');
    }

    sgMail?.setApiKey(apiKey); // Set the SendGrid API key
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }): Promise<void> {
    try {
      const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');
      if (!fromEmail) {
        throw new Error(
          'SendGrid "from" email is not set in environment variables'
        );
      }

      const msg: sgMail.MailDataRequired = {
        to,
        from: fromEmail, // Verified sender email
        subject,
        text,
        html,
      };

      await sgMail.send(msg);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw new Error('Email sending failed');
    }
  }

  async sendTemplateEmail(
    to: string,
    templateId: string,
    dynamicTemplateData: Record<string, any>
  ): Promise<void> {
    try {
      const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');
      if (!fromEmail) {
        throw new Error(
          'SendGrid "from" email is not set in environment variables'
        );
      }

      const msg: sgMail.MailDataRequired = {
        to,
        from: fromEmail,
        templateId,
        dynamicTemplateData,
      };

      await sgMail.send(msg);
      this.logger.log(`Template email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send template email to ${to}`, error.stack);
      throw new Error('Template email sending failed');
    }
  }
}
