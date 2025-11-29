import Customer from "../models/Customer.js";

// ✅ Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new customer
export const addCustomer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Basic validation
    if (!name || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customer = new Customer({ name, phone, email });
    await customer.save();

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
