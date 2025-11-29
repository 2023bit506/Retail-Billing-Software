import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API = "http://localhost:5000/api/reports";

const Reports = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [counterData, setCounterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);

      let url = API;
      if (startDate && endDate) {
        url += `?start=${startDate}&end=${endDate}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setMonthlyData(data.monthlyData || []);
      setCounterData(data.counterData || []);
      setError("");
    } catch (err) {
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchReports();
  }, []);

  // Export CSV
  const handleExport = () => {
    const rows = [
      ["Month", "Sales", "Revenue"],
      ...monthlyData.map((m: any) => [m.month, m.sales, m.revenue]),
    ];

    const csv = rows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Dynamic sales and performance reports
          </p>
        </div>

        <div className="flex gap-2">
          {/* Date Range Picker */}
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={startDate}
              className="border rounded px-2 py-1"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              className="border rounded px-2 py-1"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button onClick={fetchReports}>
              <Calendar className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </div>

          {/* Export */}
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && (
        <div className="grid gap-6">
          {/* Monthly Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#2563eb" />
                  <Line type="monotone" dataKey="revenue" stroke="#16a34a" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Counter Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Counter Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={counterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="counter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
