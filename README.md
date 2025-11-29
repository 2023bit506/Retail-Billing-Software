# 🛒 Retail Billing Software  
### A Modern, Full-Stack POS & Inventory Management System

A feature-rich retail billing system with admin dashboard, cashier billing panel, stock management, analytics, PDF invoice generation, and more.  
Designed for **Shops, Retail Stores, Supermarkets, and Billing Counters**.

---

## 🚀 Features

### 🔐 Authentication  
- Admin & Cashier Login  
- JWT-secure authentication  
- Role-based access  
- Auto session restore  

### 🧾 Billing System  
- Add items with quantity  
- Automatic subtotal + GST + Total  
- Auto stock reduce on sale  
- PDF invoice generation  
- Share bill via **Email / WhatsApp**  
- Clean UI for fast billing  

### 📦 Product Management  
- Add / Edit / Delete products  
- Automatic stock updates  
- Low stock warning  
- Product search  

### 🧑‍🤝‍🧑 User Management  
- Add admin/cashier  
- Secure password hashing (bcrypt)  
- Activate/Deactivate users  

### 📊 Reports & Analytics  
- Monthly revenue & sales chart  
- Counter-wise performance  
- Date-range filtering  
- Export reports (CSV/PDF)  

### ⚙️ Settings  
- Business details  
- GST Configuration  
- Discount Settings  
- Notifications  

---

## 🖥️ Tech Stack

### **Frontend**
- React + TypeScript  
- TailwindCSS  
- ShadCN UI  
- Recharts  
- Context API  
- Lucide Icons  

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- bcryptjs  
- jsonwebtoken  
- pdfkit  
- nodemailer  

Retail-Billing-Software/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── index.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── api/
│ │ └── utils/
│ └── public/
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository  
git clone https://github.com/<your-username>/Retail-Billing-Software.git
cd Retail-Billing-Software

🔧 Backend Setup
cd backend
npm install

Create .env file
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Run Backend
npm start


or

nodemon index.js

🖥️ Frontend Setup
cd frontend
npm install
npm run dev

🧪 Demo Credentials
Admin
Email: admin@gmail.com
Password: admin123

Cashier
Email: user@gmail.com
Password: user123

🧾 Sample Invoice (PDF)
Bill ID: 6929ee4da2d9e43ba232e4db
Customer: John Doe
Date: 29/11/2025, 12:17 AM

Items:
- Pen × 3 = ₹45
- Notebook × 2 = ₹120

Total Amount: ₹165

📊 Dashboard Features

Live charts

Monthly business insights

Low stock alerts

Sales summary

🛡️ Security

Password hashing (bcrypt)

JWT authentication

Protected admin routes

🤝 Contributing

Pull requests are welcome!
For major updates, open an issue to discuss changes.

📄 License

Licensed under the MIT License.

⭐ Support

If you like this project, please star ⭐ the repository!

---
