import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  _id: string;
  customerName: string;
  date: string;
  totalAmount: number;
  items: { product: { name: string }; quantity: number; total: number }[];
}

const API_URL = "http://localhost:5000/api/bills";

const BillHistory = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all bills from backend
  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch bills");
      const data = await response.json();
      setBills(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error fetching bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // ✅ View Bill Details
  const handleView = (bill: Bill) => {
    const details = `
🧾 Bill ID: ${bill._id}
👤 Customer: ${bill.customerName}
📅 Date: ${new Date(bill.date).toLocaleString()}
💰 Total Amount: ₹${bill.totalAmount.toLocaleString()}
📦 Items:
${bill.items
  .map(
    (item) =>
      `- ${item.product?.name || "Unknown"} × ${item.quantity} = ₹${item.total}`
  )
  .join("\n")}
    `;
    alert(details);
  };

  // ✅ Download Bill as PDF
  const handleDownload = async (billId: string) => {
    try {
      const response = await fetch(`${API_URL}/${billId}/pdf`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Bill_${billId.slice(-6)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Bill downloaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error downloading bill");
    }
  };

  const filteredBills = bills.filter(
    (bill) =>
      bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bill History</h1>
        <p className="text-muted-foreground">View all generated bills and invoices</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by bill ID or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={fetchBills} disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    {loading ? "Loading bills..." : "No bills found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill) => (
                  <TableRow key={bill._id}>
                    <TableCell className="font-medium">{bill._id.slice(-6).toUpperCase()}</TableCell>
                    <TableCell>{bill.customerName}</TableCell>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.items?.length || 0}</TableCell>
                    <TableCell className="font-semibold">₹{bill.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="default">paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleView(bill)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDownload(bill._id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillHistory;
