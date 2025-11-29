import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email)
      return res.status(400).json({ error: "Customer email is required" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject || "BillFlow Notification",
      html: `<p>${message}</p>`
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Email send failed" });
  }
};
