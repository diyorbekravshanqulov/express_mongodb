const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtpHost"),
      port: config.get("smtpPort"),
      secure: false,
      auth: {
        user: config.get("smtpUser"),
        pass: config.get("smtpPassword"),
      },
    });
  }
  async sendActivationMail(toMail, link) {
    await this.transporter.sendMail({
      from: config.get("smtpUser"),
      to: toMail,
      subject: "Activate ITINTO account",
      text: "",
      html: `
            <div>
                <h1>Akkountini faollashtirish uchun quyidagi linkni bosing </h1>
                <a href="${link}">Activate</a>
            </div>
          `,
    });
  }
}

module.exports = new MailService();
