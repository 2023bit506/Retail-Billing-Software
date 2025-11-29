import express from "express";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { customerEmail, customerName, bill, totalAmount } = req.body;

    if (!customerEmail)
      return res.status(400).json({ message: "Email is required" });

    if (!bill || !bill.items)
      return res.status(400).json({ message: "Invalid bill data" });

    // Create unique PDF name
    const fileName = `bill_${Date.now()}.pdf`;
    const pdfPath = path.join(process.cwd(), fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Header
    doc.fontSize(22).text("Billing Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Customer: ${customerName}`);
    doc.text(`Bill ID: ${bill._id}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(14).text("Items:");
    doc.moveDown(0.5);

    // ✅ FIXED: Safe item rendering (prevents crash on null product)
    bill.items.forEach((item) => {
      const productName = item?.product?.name || "Unknown Item";
      const quantity = item?.quantity || 0;
      const price = item?.product?.price || 0;

      doc.text(`• ${productName} (Qty: ${quantity}) - ₹${price}`);
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total Amount: ₹${totalAmount}`);
    doc.end();

    await new Promise((resolve) => stream.on("finish", resolve));

    // Gmail Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Your Invoice - Thank You!",
      html: `
        <h3>Hello ${customerName},</h3>
        <p>Thank you for shopping with us.</p>
        <p>Your invoice is attached below.</p>
        <p>Regards,<br>Billing System</p>
      `,
      attachments: [
        {
          filename: "invoice.pdf",
          path: pdfPath,
        },
      ],
    });

    fs.unlinkSync(pdfPath);

    res.json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
