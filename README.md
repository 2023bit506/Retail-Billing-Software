🛒 Retail Billing Software

A modern, full-stack billing and inventory management system built for retail stores.
Includes admin dashboard, cashier billing panel, product management, analytics, reports, and more.

🚀 Features
🔐 Authentication

Admin & Cashier login system

JWT-based secure authentication

Role-based access (Admin / User)

🧾 Billing System

Add products to cart with quantity

Auto-calculated totals, GST, subtotal

PDF invoice generation

Send bill via Email / WhatsApp

Auto-updates product stock after billing

📦 Product Management

Add / edit / delete products

Real-time stock validation

Low-stock indicators

🧑‍🤝‍🧑 User Management

Add new admin or cashier

View all users

Update / delete users

📊 Reports & Analytics

Monthly revenue & sales chart

Counter-wise performance

Export reports

Dynamic date-range filtering

⚙️ Settings

Store details (name, address, email)

GST configuration

Discount configuration

Notification preferences

🖥️ Tech Stack
Frontend

React + TypeScript

TailwindCSS

ShadCN UI

Recharts

Lucide Icons

Context API (Cart & Auth)

Backend

Node.js

Express

MongoDB + Mongoose

bcryptjs

jsonwebtoken

pdfkit

nodemailer

📂 Project Structure
Retail-Billing-Software/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── utils/
│   └── public/
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/Retail-Billing-Software.git
cd Retail-Billing-Software

📦 Backend Setup
Install dependencies:
cd backend
npm install

Create .env file:
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
EMAIL_USER=your-email
EMAIL_PASS=your-email-password

Start backend:
npm start


OR

nodemon index.js

🖥️ Frontend Setup
cd frontend
npm install
npm run dev

🧪 Demo Credentials
Admin Login
Email: admin@gmail.com
Password: admin123

Cashier Login
Email: user@gmail.com
Password: user123

🧾 Invoice Sample Output
Bill ID: 6929ee4da2d9e43ba232e4db
Customer: John Doe
Date: 29/11/2025, 12:17:41 AM

Items:
- Pen × 3 = ₹45
- Notebook × 2 = ₹120

Total Amount: ₹165

📊 Dashboard Preview

Modern UI with charts

Bill overview

Low-stock alerts

Performance tracking

🛡️ Security

Encrypted passwords (bcrypt)

Token-based login (JWT)

Protected admin routes

API input validation

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📄 License

This project is licensed under the MIT License.

⭐ Show Support

If you like this project, please ⭐ the repository!
