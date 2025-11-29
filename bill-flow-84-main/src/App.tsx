// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import Layout from "@/components/Layout";

// // Pages
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
// import Profile from "./pages/Profile";

// // Admin Pages
// import AdminDashboard from "./pages/admin/Dashboard";
// import Products from "./pages/admin/Products";
// import Users from "./pages/admin/Users";
// import Bills from "./pages/admin/Bills";
// import Reports from "./pages/admin/Reports";
// import Settings from "./pages/admin/Settings";

// // User Pages
// import Billing from "./pages/user/Billing";
// import BillHistory from "./pages/user/BillHistory";
// import UserProducts from "./pages/user/Products";
// import Customers from "./pages/user/Customers";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider>
//             <Routes>
//               <Route path="/" element={<Navigate to="/login" replace />} />
//               <Route path="/login" element={<Login />} />
              
//               {/* Admin Routes */}
//               <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute requiredRole="admin">
//                     <Layout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route index element={<Navigate to="/admin/dashboard" replace />} />
//                 <Route path="dashboard" element={<AdminDashboard />} />
//                 <Route path="products" element={<Products />} />
//                 <Route path="users" element={<Users />} />
//                 <Route path="bills" element={<Bills />} />
//                 <Route path="reports" element={<Reports />} />
//                 <Route path="settings" element={<Settings />} />
//                 <Route path="profile" element={<Profile />} />
//               </Route>

//               {/* User Routes */}
//               <Route
//                 path="/user"
//                 element={
//                   <ProtectedRoute requiredRole="user">
//                     <Layout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route index element={<Navigate to="/user/billing" replace />} />
//                 <Route path="billing" element={<Billing />} />
//                 <Route path="history" element={<BillHistory />} />
//                 <Route path="products" element={<UserProducts />} />
//                 <Route path="customers" element={<Customers />} />
//                 <Route path="profile" element={<Profile />} />
//               </Route>

//               {/* 404 Route */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;




import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Bills from "./pages/admin/Bills";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// User Pages
import Billing from "./pages/user/Billing";
import BillHistory from "./pages/user/BillHistory";
import UserProducts from "./pages/user/Products";
import Customers from "./pages/user/Customers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="bills" element={<Bills />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* User Routes */}
              <Route
                path="/user/*"
                element={
                  <ProtectedRoute requiredRole="user">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/user/billing" replace />} />
                <Route path="billing" element={<Billing />} />
                <Route path="history" element={<BillHistory />} />
                <Route path="products" element={<UserProducts />} />
                <Route path="customers" element={<Customers />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
