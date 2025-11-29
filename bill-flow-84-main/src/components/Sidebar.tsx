import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  BarChart3, 
  ShoppingCart,
  Settings,
  Receipt,
  History,
  UserSquare2,
  UserCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { user } = useAuth();

  const adminLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/bills", icon: FileText, label: "Bills" },
    { to: "/admin/reports", icon: BarChart3, label: "Reports" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
    { to: "/admin/profile", icon: UserCircle, label: "Profile" },
  ];

  const userLinks = [
    { to: "/user/billing", icon: ShoppingCart, label: "Billing" },
    { to: "/user/history", icon: History, label: "Bill History" },
    { to: "/user/products", icon: Package, label: "Products" },
    { to: "/user/customers", icon: UserSquare2, label: "Customers" },
    { to: "/user/profile", icon: UserCircle, label: "Profile" },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 border-r border-border bg-card h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground bg-muted/30 hover:bg-muted hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
