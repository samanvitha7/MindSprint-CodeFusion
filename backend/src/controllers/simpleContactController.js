import nodemailer from "nodemailer";
import ContactModel from "../models/Contact.js"; // if you have it, otherwise remove

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_EMAIL_PASS,
    },
  });
};

export const sendContactEmail = async (req, res) => {
  const { userEmail, ourEmail, description } = req.body;

  if (!userEmail || !ourEmail || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required." });
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"KalaSangam Contact" <${process.env.CONTACT_EMAIL}>`,
      replyTo: userEmail,
      to: ourEmail,
      subject: `New contact form message from ${userEmail}`,
      text: `From: ${userEmail}\n\n${description}`,
      html: `<p><strong>From:</strong> ${userEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${(description || "").replace(/\n/g, "<br>")}</p>`,
    };

    await transporter.sendMail(mailOptions);

    // optional DB save
    if (ContactModel) {
      try {
        await ContactModel.create({ userEmail, ourEmail, description });
      } catch (dbErr) {
        console.warn("Contact save failed:", dbErr);
      }
    }

    return res.json({ success: true, message: "Submitted successfully" });
  } catch (err) {
    console.error("Error in sendContactEmail:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
