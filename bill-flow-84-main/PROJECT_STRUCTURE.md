# Bill Flow - Retail Billing & Management System

## 📋 Project Overview

A comprehensive retail billing and management system built with React, TypeScript, Vite, and Tailwind CSS. Features role-based authentication, inventory management, billing system, customer management, and analytics reporting.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui + Radix UI
- **Routing**: React Router v6
- **State Management**: React Context API (Auth & Cart)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── main.tsx                   # Application entry point
├── index.css                  # Design system & global styles
├── components/
│   ├── Layout.tsx             # Main layout wrapper
│   ├── Navbar.tsx             # Top navigation bar
│   ├── Sidebar.tsx            # Role-based sidebar navigation
│   ├── ProtectedRoute.tsx     # Route protection wrapper
│   └── ui/                    # Shadcn UI components
├── context/
│   ├── AuthContext.tsx        # Authentication state management
│   └── CartContext.tsx        # Shopping cart state management
├── pages/
│   ├── Login.tsx              # Login page with role selection
│   ├── NotFound.tsx           # 404 error page
│   ├── Profile.tsx            # User profile & settings (shared)
│   ├── admin/
│   │   ├── Dashboard.tsx      # Admin dashboard with analytics
│   │   ├── Bills.tsx          # View all bills
│   │   ├── Products.tsx       # Product inventory management
│   │   ├── Users.tsx          # User management (CRUD)
│   │   ├── Reports.tsx        # Sales reports & charts
│   │   └── Settings.tsx       # Business settings
│   └── user/
│       ├── Billing.tsx        # Create new bills
│       ├── BillHistory.tsx    # View bill history
│       ├── Products.tsx       # Browse products
│       └── Customers.tsx      # Customer management
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
└── lib/
    └── utils.ts               # Utility functions
```

## 🚀 Features

### Authentication System
- **Role-based login**: Admin and Cashier (User) roles
- **Protected routes**: Automatic redirection based on authentication status
- **Demo credentials**:
  - Admin: `admin@retail.com` / `admin123`
  - Cashier: `user@retail.com` / `user123`

### Admin Panel (`/admin/*`)
1. **Dashboard**: Overview with key metrics and recent activity
2. **Products**: Full CRUD operations for inventory management
3. **Users**: Manage system users and roles
4. **Bills**: View and search all bills
5. **Reports**: Sales analytics with interactive charts
6. **Settings**: Business configuration (GST, notifications)
7. **Profile**: Personal account settings

### Cashier Panel (`/user/*`)
1. **Billing**: Create new bills with cart functionality
2. **Bill History**: View past transactions with search/filter
3. **Products**: Browse available products
4. **Customers**: Manage customer database
5. **Profile**: Personal account settings

### Key Features
- ✅ **Role-based Navigation**: Dynamic sidebar based on user role
- ✅ **Cart System**: Add/remove products, calculate totals with GST
- ✅ **Search & Filter**: Find products, customers, bills quickly
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Dark Mode Ready**: Theme toggle in profile settings
- ✅ **Toast Notifications**: User feedback for actions
- ✅ **Form Validation**: Client-side validation with Zod
- ✅ **Loading States**: Skeleton screens for better UX

## 🎨 Design System

### Color Tokens (HSL)
All colors use semantic tokens defined in `src/index.css`:

```css
--primary: 210 90% 48%        /* Main brand color */
--secondary: 142 76% 36%      /* Success/positive actions */
--accent: 173 80% 40%         /* Highlights */
--destructive: 0 84% 60%      /* Errors/delete actions */
--muted: 210 40% 96%          /* Backgrounds */
--foreground: 215 25% 15%     /* Text color */
```

### Component Variants
- Buttons: `default`, `secondary`, `outline`, `destructive`, `ghost`
- Badges: `default`, `secondary`, `outline`, `destructive`
- Cards: Consistent elevation and spacing

## 🔐 Authentication Flow

1. User visits `/` → Redirected to `/login`
2. User selects role (Admin/Cashier) and enters credentials
3. On success:
   - Admin → `/admin/dashboard`
   - Cashier → `/user/billing`
4. User data stored in localStorage
5. Protected routes check authentication and role
6. Logout clears localStorage and redirects to `/login`

## 🔄 Routing Structure

```
/ → /login (if not authenticated)

/admin/* (Admin only)
  ├── /dashboard
  ├── /products
  ├── /users
  ├── /bills
  ├── /reports
  ├── /settings
  └── /profile

/user/* (Cashier only)
  ├── /billing
  ├── /history
  ├── /products
  ├── /customers
  └── /profile

* → /404 (Not Found)
```

## 📊 State Management

### AuthContext
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### CartContext
```typescript
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}
```

## 🚧 Backend Integration Points

**TODO: Connect to backend API** (Currently using dummy data)

### API Endpoints Needed

```typescript
// Authentication
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

// Products
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

// Customers
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id

// Bills
GET    /api/bills
GET    /api/bills/:id
POST   /api/bills
GET    /api/bills/:id/download (PDF)
POST   /api/bills/:id/send-email

// Users (Admin only)
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

// Reports (Admin only)
GET    /api/reports/daily
GET    /api/reports/weekly
GET    /api/reports/monthly
GET    /api/reports/dashboard
```

## 🧪 Testing the Application

### Login Flow
1. Navigate to `/login`
2. Select "Cashier" tab
3. Enter: `user@retail.com` / `user123`
4. Click "Sign In"
5. Should redirect to `/user/billing`

### Admin Flow
1. Navigate to `/login`
2. Select "Admin" tab
3. Enter: `admin@retail.com` / `admin123`
4. Click "Sign In"
5. Should redirect to `/admin/dashboard`

### Protected Routes
1. Try accessing `/admin/dashboard` without login → Redirects to `/login`
2. Login as Cashier, try accessing `/admin/dashboard` → Redirects to `/user/billing`
3. Login as Admin, try accessing `/user/billing` → Redirects to `/admin/dashboard`

### 404 Page
1. Navigate to any invalid route (e.g., `/random-page`)
2. Should see professional 404 error page
3. Click "Go Back" or "Return Home" to navigate

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Next Steps

1. **Backend Integration**
   - Set up Node.js + Express + MongoDB backend
   - Replace dummy data with API calls
   - Add axios interceptors for authentication

2. **Enhanced Features**
   - PDF invoice generation
   - Email/WhatsApp bill sending
   - Excel/CSV export
   - Advanced filtering and search
   - Real-time notifications

3. **Security**
   - JWT token refresh mechanism
   - Rate limiting
   - Input sanitization
   - HTTPS enforcement
   - CORS configuration

4. **Performance**
   - Lazy loading routes
   - Image optimization
   - API response caching
   - Debounced search inputs

5. **Testing**
   - Unit tests (Vitest)
   - Integration tests
   - E2E tests (Playwright)

## 🔑 Environment Variables

Create `.env` file in root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Bill Flow
```

## 📝 Notes

- All colors must use HSL format via design tokens
- Never hardcode colors in components
- Use semantic tokens from `index.css` and `tailwind.config.ts`
- All API calls should be centralized in a `/services` folder
- Form validation should use Zod schemas
- Error boundaries should be added for production

## 🤝 Contributing

1. Create feature branch
2. Make changes following existing code style
3. Test thoroughly (both admin and cashier roles)
4. Submit pull request with detailed description

## 📄 License

Private - All Rights Reserved
