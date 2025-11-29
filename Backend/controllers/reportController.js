import Bill from "../models/Bill.js";

export const getReports = async (req, res) => {
  try {
    let { start, end } = req.query;

    const filter = {};

    // ⭐ If date range is provided → filter bills
    if (start && end) {
      filter.date = {
        $gte: new Date(start),
        $lte: new Date(end + "T23:59:59"),
      };
    }

    // Fetch bills (filtered or all)
    const bills = await Bill.find(filter);

    const monthlyDataMap = {};
    const counterDataMap = {};

    bills.forEach((bill) => {
      const date = new Date(bill.date);
      const month = date.toLocaleString("default", { month: "short" });

      // ⭐ Monthly Sales & Revenue
      if (!monthlyDataMap[month]) {
        monthlyDataMap[month] = {
          month,
          sales: 0,
          revenue: 0,
        };
      }

      monthlyDataMap[month].sales += bill.items.length;
      monthlyDataMap[month].revenue += bill.totalAmount;

      // ⭐ Counter Performance (fallback: "Counter 1")
      const counter = bill.counterName || "Counter 1";

      if (!counterDataMap[counter]) {
        counterDataMap[counter] = {
          counter,
          sales: 0,
        };
      }

      counterDataMap[counter].sales += bill.totalAmount;
    });

    res.json({
      monthlyData: Object.values(monthlyDataMap),
      counterData: Object.values(counterDataMap),
    });
  } catch (err) {
    console.error("❌ Error generating reports:", err);
    res.status(500).json({ message: err.message });
  }
};
