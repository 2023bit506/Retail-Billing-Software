// import Bill from "../models/Bill.js";
// import Product from "../models/Product.js";
// import PDFDocument from "pdfkit";

// // GET all bills
// export const getBills = async (req, res) => {
//   try {
//     const bills = await Bill.find().populate("items.product");
//     res.json(bills);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ADD BILL (correct totals)
// export const addBill = async (req, res) => {
//   try {
//     const { customerName, items } = req.body;

//     if (!customerName || !items?.length) {
//       return res.status(400).json({ message: "Invalid bill data" });
//     }

//     let totalAmount = 0;

//     const processedItems = await Promise.all(
//       items.map(async (item) => {
//         const product = await Product.findById(item.product);
//         if (!product) throw new Error("Product not found");

//         const quantity = Number(item.quantity) || 1;
//         const price = product.price;
//         const total = price * quantity;
//         totalAmount += total;

//         return {
//           product: product._id,
//           quantity,
//           total,
//           name: product.name,
//           price,
//         };
//       })
//     );

//     const bill = await Bill.create({
//       customerName,
//       items: processedItems,
//       totalAmount,
//       date: new Date(),
//     });

//     res.status(201).json(bill);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GENERATE MINIMAL PDF
// export const generateBillPDF = async (req, res) => {
//   try {
//     const bill = await Bill.findById(req.params.id).populate("items.product");

//     if (!bill) {
//       return res.status(404).json({ message: "Bill not found" });
//     }

//     const doc = new PDFDocument({ margin: 40 });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=bill_${bill._id}.pdf`
//     );

//     doc.pipe(res);

//     const formatCurrency = (v) =>
//       `₹${Number(v ?? 0).toFixed(2).replace(/\.00$/, "")}`;

//     const dateStr = bill.date
//       ? new Date(bill.date).toLocaleString()
//       : new Date().toLocaleString();

//     // Write simple minimal text
//     doc.fontSize(14);
//     doc.text(`Bill ID: ${bill._id}`);
//     doc.text(`Customer: ${bill.customerName}`);
//     doc.text(`Date: ${dateStr}`);
//     doc.moveDown();
//     doc.text("Items:");

//     bill.items.forEach((item) => {
//       const total = Number(item.total);
//       const text = `- ${item.name} × ${item.quantity} = ${formatCurrency(
//         total
//       )}`;
//       doc.text(text, { indent: 20 });
//     });

//     doc.moveDown();
//     doc.text(`Total Amount: ${formatCurrency(bill.totalAmount)}`);

//     doc.end();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import PDFDocument from "pdfkit";

// GET all bills
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("items.product");
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD BILL (correct totals + stock reduction)
export const addBill = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (!customerName || !items?.length) {
      return res.status(400).json({ message: "Invalid bill data" });
    }

    let totalAmount = 0;

    const processedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error("Product not found");

        const quantity = Number(item.quantity) || 1;
        const price = product.price;
        const total = price * quantity;

        // ❗ STOCK CHECK
        if (product.stock < quantity) {
          throw new Error(
            `${product.name} has only ${product.stock} left in stock`
          );
        }

        // ❗ REDUCE STOCK
        product.stock -= quantity;
        await product.save();

        totalAmount += total;

        return {
          product: product._id,
          quantity,
          total,
          name: product.name,
          price,
        };
      })
    );

    const bill = await Bill.create({
      customerName,
      items: processedItems,
      totalAmount,
      date: new Date(),
    });

    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GENERATE MINIMAL PDF (clean & simple)
export const generateBillPDF = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("items.product");

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=bill_${bill._id}.pdf`
    );

    doc.pipe(res);

    const formatCurrency = (v) =>
      `₹${Number(v ?? 0)
        .toFixed(2)
        .replace(/\.00$/, "")}`;

    const dateStr = bill.date
      ? new Date(bill.date).toLocaleString()
      : new Date().toLocaleString();

    // Header
    doc.fontSize(14);
    doc.text(`Bill ID: ${bill._id}`);
    doc.text(`Customer: ${bill.customerName}`);
    doc.text(`Date: ${dateStr}`);
    doc.moveDown();

    // Items
    doc.text("Items:");
    bill.items.forEach((item) => {
      const total = Number(item.total);
      const text = `- ${item.name} × ${item.quantity} = ${formatCurrency(
        total
      )}`;
      doc.text(text, { indent: 20 });
    });

    doc.moveDown();
    doc.text(`Total Amount: ${formatCurrency(bill.totalAmount)}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
