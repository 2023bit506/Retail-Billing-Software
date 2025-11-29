// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from "lucide-react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState([
//     { title: "Total Revenue", value: "₹0", change: "0%", icon: DollarSign, color: "text-primary" },
//     { title: "Total Sales", value: "0", change: "0%", icon: ShoppingCart, color: "text-secondary" },
//     { title: "Active Users", value: "0", change: "0%", icon: Users, color: "text-accent" },
//     { title: "Products", value: "0", change: "0%", icon: Package, color: "text-warning" },
//   ]);

//   const [salesData, setSalesData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);

//   const COLORS = [
//     "hsl(var(--chart-1))",
//     "hsl(var(--chart-2))",
//     "hsl(var(--chart-3))",
//     "hsl(var(--chart-4))",
//   ];

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/dashboard");
//         const data = res.data;

//         // 🔹 Update stats
//         setStats([
//           {
//             title: "Total Revenue",
//             value: `₹${data.totalRevenue.toLocaleString()}`,
//             change: "+12.5%",
//             icon: DollarSign,
//             color: "text-primary",
//           },
//           {
//             title: "Total Sales",
//             value: data.totalSales.toString(),
//             change: "+8.2%",
//             icon: ShoppingCart,
//             color: "text-secondary",
//           },
//           {
//             title: "Active Users",
//             value: data.activeUsers.toString(),
//             change: "+3.1%",
//             icon: Users,
//             color: "text-accent",
//           },
//           {
//             title: "Products",
//             value: data.totalProducts.toString(),
//             change: "+2.4%",
//             icon: Package,
//             color: "text-warning",
//           },
//         ]);

//         // 🔹 Update charts
//         setSalesData(data.salesData);
//         setCategoryData(data.categoryData);
//       } catch (err) {
//         console.error("❌ Error fetching dashboard data:", err);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//         <p className="text-muted-foreground">
//           Welcome back! Here's your business overview.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//               <stat.icon className={`h-5 w-5 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
//                 <TrendingUp className="h-3 w-3 text-success" />
//                 <span className="text-success">{stat.change}</span> from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts Grid */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Sales Trend */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Weekly Sales Trend</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "var(--radius)",
//                   }}
//                 />
//                 <Legend />
//                 <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Category Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Sales by Category</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "var(--radius)",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Revenue Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Daily Revenue Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={salesData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
//               <YAxis stroke="hsl(var(--muted-foreground))" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--card))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "var(--radius)",
//                 }}
//               />
//               <Legend />
//               <Bar dataKey="sales" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
//               <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;



import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    customers: 0,
    products: 0,
  });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  // 🎯 Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch real data from backend
      const [billRes, productRes, customerRes] = await Promise.all([
        fetch(`${API_BASE}/bills`),
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/customers`),
      ]);

      const bills = await billRes.json();
      const products = await productRes.json();
      const customers = await customerRes.json();

      // Calculate stats
      const totalRevenue = bills.reduce(
        (sum: number, bill: any) => sum + (bill.totalAmount || 0),
        0
      );
      const totalSales = bills.length;

      setStats({
        totalRevenue,
        totalSales,
        customers: customers.length,
        products: products.length,
      });

      // Generate mock chart data from bills
      const salesChartData = bills.slice(-7).map((bill: any, i: number) => ({
        name: `#${bill._id.slice(-4)}`,
        sales: bill.items?.length || 0,
        revenue: bill.totalAmount || 0,
      }));

      setSalesData(salesChartData);

      // Count category distribution (if product has category)
      const categoryCount: Record<string, number> = {};
      products.forEach((p: any) => {
        const cat = p.category || "Uncategorized";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });

      const categories = Object.keys(categoryCount).map((name) => ({
        name,
        value: categoryCount[name],
      }));

      setCategoryData(categories);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load dashboard data");
      setError("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Total Sales",
      value: stats.totalSales.toString(),
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-secondary",
    },
    {
      title: "Active Customers",
      value: stats.customers.toString(),
      change: "+3.1%",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Products",
      value: stats.products.toString(),
      change: "+2.4%",
      icon: Package,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here’s your business overview.
        </p>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar
                dataKey="sales"
                fill="hsl(var(--secondary))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
