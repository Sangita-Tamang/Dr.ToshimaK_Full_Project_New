const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../config/logger');

class EmailService {
  static async sendEmail(options) {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_EMAIL,
        pass: env.SMTP_PASSWORD
      }
    });

    const message = {
      from: `"${env.FROM_NAME}" <${env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<p>${options.message}</p>`
    };

    try {
      const info = await transporter.sendMail(message);
      logger.info(`Message sent: %s`, info.messageId);
      return info;
    } catch (err) {
      logger.error(`Error sending email: ${err.message}`);
      throw err;
    }
  }
}

module.exports = EmailService;
