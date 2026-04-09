import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country, city, email, surname, message, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const langLabel =
      lang === "es" ? "Spanish" : lang === "it" ? "Italian" : "English";

    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #2C1810; padding: 32px;">
        <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 24px; color: #2C1810;">
          New message from colotuzzo.com
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45; width: 140px;">Name</td>
            <td style="padding: 8px 12px; color: #2C1810;">${name}</td>
          </tr>
          <tr style="background:#F5F0E8;">
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45;">Email</td>
            <td style="padding: 8px 12px; color: #2C1810;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45;">Country</td>
            <td style="padding: 8px 12px; color: #2C1810;">${country || "—"}</td>
          </tr>
          <tr style="background:#F5F0E8;">
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45;">City</td>
            <td style="padding: 8px 12px; color: #2C1810;">${city || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45;">Surname variation</td>
            <td style="padding: 8px 12px; color: #2C1810;">${surname || "—"}</td>
          </tr>
          <tr style="background:#F5F0E8;">
            <td style="padding: 8px 12px; font-weight: bold; color: #6B5B45;">Language</td>
            <td style="padding: 8px 12px; color: #2C1810;">${langLabel}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #F5F0E8; border-left: 3px solid #8B7355;">
          <p style="margin: 0; line-height: 1.7; color: #2C1810; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 32px; font-size: 0.75rem; color: #8B7355;">
          Sent from colotuzzo.com contact form
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"colotuzzo.com" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} — colotuzzo.com`,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}\nCountry: ${country || "—"}\nCity: ${city || "—"}\nSurname: ${surname || "—"}\nLanguage: ${langLabel}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
