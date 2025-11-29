// src/utils/invoicegenerator.ts
import jsPDF from "jspdf";

export const generateInvoicePDF = (bill: any) => {
  const doc = new jsPDF("p", "mm", "a4");

  const yStart = 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  const formatCurrency = (v: number) =>
    `₹${Number(v ?? 0).toFixed(2).replace(/\.00$/, "")}`;

  const dateStr = bill?.date
    ? new Date(bill.date).toLocaleString()
    : new Date().toLocaleString();

  doc.text(`Bill ID: ${bill._id}`, 20, yStart);
  doc.text(`Customer: ${bill.customerName}`, 20, yStart + 10);
  doc.text(`Date: ${dateStr}`, 20, yStart + 20);

  doc.text("Items:", 20, yStart + 35);

  let y = yStart + 45;

  (bill.items || []).forEach((item: any) => {
    const total = Number(item.total ?? item.price * item.quantity);
    doc.text(
      `- ${item.name} × ${item.quantity} = ${formatCurrency(total)}`,
      25,
      y
    );
    y += 10;
  });

  const grandTotal =
    Number(bill.total) ||
    Number(bill.totalAmount) ||
    (bill.items || []).reduce((s: number, it: any) => s + Number(it.total), 0);

  doc.text(`Total Amount: ${formatCurrency(grandTotal)}`, 20, y + 10);

  doc.save(`Invoice-${bill._id}.pdf`);
};
