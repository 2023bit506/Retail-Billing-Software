// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Search, Download, Eye } from "lucide-react";
// import Modal from "react-modal";
// import jsPDF from "jspdf";

// interface Bill {
//   _id: string;
//   customerName: string;
//   date: string;
//   totalAmount: number;
//   items: { name: string; price: number; quantity: number }[];
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const Bills = () => {
//   const [bills, setBills] = useState<Bill[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [sortField, setSortField] = useState<"amount" | "date">("date");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [viewBill, setViewBill] = useState<Bill | null>(null);

//   useEffect(() => {
//     const fetchBills = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await fetch(`${API_URL}/api/bills`);
//         if (!response.ok) throw new Error(`Server responded with ${response.status}`);
//         const data = await response.json();
//         setBills(Array.isArray(data) ? data : data?.bills || []);
//       } catch (err: any) {
//         console.error("Error fetching bills:", err);
//         setError("Failed to fetch bills from server.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBills();
//   }, []);

//   // 🔹 Filter by search query (Bill ID last 6 digits or Customer Name)
//   const searchedBills = bills.filter((bill) => {
//     const billIdShort = bill._id?.slice(-6).toLowerCase();
//     return (
//       bill.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       billIdShort?.includes(searchQuery.toLowerCase())
//     );
//   });

//   // 🔹 Sort bills
//   const sortedBills = [...searchedBills].sort((a, b) => {
//     if (sortField === "amount") {
//       return sortOrder === "asc"
//         ? a.totalAmount - b.totalAmount
//         : b.totalAmount - a.totalAmount;
//     } else {
//       return sortOrder === "asc"
//         ? new Date(a.date).getTime() - new Date(b.date).getTime()
//         : new Date(b.date).getTime() - new Date(a.date).getTime();
//     }
//   });

//   // 🔹 Export filtered + sorted bills to CSV
//   const handleExport = () => {
//     if (sortedBills.length === 0) return;
//     const headers = ["Bill ID", "Customer", "Date", "Items", "Amount"];
//     const rows = sortedBills.map(bill => [
//       bill._id,
//       bill.customerName,
//       new Date(bill.date).toLocaleDateString(),
//       bill.items.length,
//       bill.totalAmount
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map(e => e.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "bills.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // 🔹 Download PDF for a single bill
//   const handleDownloadBill = (bill: Bill) => 
//     {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Invoice", 105, 20, { align: "center" });
//     doc.setFontSize(12);
//     doc.text(`Bill ID: ${bill._id}`, 20, 40);
//     doc.text(`Customer: ${bill.customerName}`, 20, 50);
//     doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 20, 60);
//     doc.text(`Items:`, 20, 70);

//     bill.items.forEach((item, index) => 
//     {
//       doc.text(
//         `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price}`,
//         25,
//         80 + index * 10
//       );
//     });

//     doc.text(`Total Amount: ₹${bill.totalAmount}`, 20, 80 + bill.items.length * 10 + 10);
//     doc.save(`Bill-${bill._id}.pdf`);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Bills</h1>
//         <p className="text-muted-foreground">View and manage all billing transactions</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search by Bill ID or Customer Name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-9"
//               />
//             </div>

//             <select
//               className="border rounded px-2 py-1"
//               value={sortField}
//               onChange={(e) => setSortField(e.target.value as "amount" | "date")}
//             >
//               <option value="date">Date</option>
//               <option value="amount">Amount</option>
//             </select>

//             <select
//               className="border rounded px-2 py-1"
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
//             >
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </select>

//             <Button variant="outline" onClick={handleExport}>
//               <Download className="mr-2 h-4 w-4" /> Export
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent>
//           {loading ? (
//             <p>Loading bills...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : bills.length === 0 ? (
//             <p>No bills found.</p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Bill ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Items</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedBills.map((bill) => (
//                   <TableRow key={bill._id}>
//                     <TableCell className="font-medium">{bill._id?.slice(-6).toUpperCase()}</TableCell>
//                     <TableCell>{bill.customerName}</TableCell>
//                     <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
//                     <TableCell>{bill.items?.length || 0}</TableCell>
//                     <TableCell className="font-semibold">₹{bill.totalAmount?.toLocaleString()}</TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button variant="outline" size="icon" onClick={() => setViewBill(bill)}>
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button variant="outline" size="icon" onClick={() => handleDownloadBill(bill)}>
//                           <Download className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Modal for viewing bill */}
//       <Modal
//         isOpen={!!viewBill}
//         onRequestClose={() => setViewBill(null)}
//         contentLabel="View Bill"
//         className="bg-white p-6 rounded-lg max-w-lg mx-auto mt-20 outline-none"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
//       >
//         {viewBill && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Bill Details</h2>
//             <p><strong>Bill ID:</strong> {viewBill._id}</p>
//             <p><strong>Customer:</strong> {viewBill.customerName}</p>
//             <p><strong>Date:</strong> {new Date(viewBill.date).toLocaleDateString()}</p>
//             <p className="mt-2 font-semibold">Items:</p>
//             <ul className="list-disc ml-5">
//               {viewBill.items.map((item, idx) => (
//                 <li key={idx}>{item.name} - Qty: {item.quantity} - ₹{item.price}</li>
//               ))}
//             </ul>
//             <p className="mt-2 font-bold">Total: ₹{viewBill.totalAmount}</p>
//             <div className="mt-4 flex justify-end gap-2">
//               <Button onClick={() => setViewBill(null)}>Close</Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Bills;



import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye } from "lucide-react";
import Modal from "react-modal";
import jsPDF from "jspdf";

interface Bill {
  _id: string;
  customerName: string;
  date: string;
  totalAmount: number;
  items: { name: string; price: number; quantity: number; total?: number }[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Bills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState<"amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewBill, setViewBill] = useState<Bill | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/api/bills`);
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        const data = await response.json();
        setBills(Array.isArray(data) ? data : data?.bills || []);
      } catch (err: any) {
        console.error("Error fetching bills:", err);
        setError("Failed to fetch bills from server.");
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  // 🔹 Filter bills
  const searchedBills = bills.filter((bill) => {
    const billIdShort = bill._id?.slice(-6).toLowerCase();
    return (
      bill.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      billIdShort?.includes(searchQuery.toLowerCase())
    );
  });

  // 🔹 Sort bills
  const sortedBills = [...searchedBills].sort((a, b) => {
    if (sortField === "amount") {
      return sortOrder === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    } else {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // 🔹 Export as CSV
  const handleExport = () => {
    if (sortedBills.length === 0) return;
    const headers = ["Bill ID", "Customer", "Date", "Items", "Amount"];
    const rows = sortedBills.map(bill => [
      bill._id,
      bill.customerName,
      new Date(bill.date).toLocaleDateString(),
      bill.items.length,
      bill.totalAmount
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bills.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔹 Professional Minimal PDF
  const handleDownloadBill = (bill: Bill) => {
    const doc = new jsPDF("p", "mm", "a4");

    const formatCurrency = (v: number) =>
      `₹${Number(v ?? 0).toFixed(2).replace(/\.00$/, "")}`;

    const dateStr = new Date(bill.date).toLocaleString();

    // Header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    doc.text(`Bill ID: ${bill._id}`, 20, 20);
    doc.text(`Customer: ${bill.customerName}`, 20, 30);
    doc.text(`Date: ${dateStr}`, 20, 40);

    doc.text("Items:", 20, 55);

    let y = 65;

    bill.items.forEach((item, index) => {
      const total = item.total ?? item.price * item.quantity;
      doc.text(
        `- ${item.name} × ${item.quantity} = ${formatCurrency(total)}`,
        25,
        y
      );
      y += 10;
    });

    doc.text(`Total Amount: ${formatCurrency(bill.totalAmount)}`, 20, y + 10);

    doc.save(`Bill-${bill._id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bills</h1>
        <p className="text-muted-foreground">View and manage all billing transactions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by Bill ID or Customer Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <select
              className="border rounded px-2 py-1"
              value={sortField}
              onChange={(e) => setSortField(e.target.value as "amount" | "date")}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>

            <select
              className="border rounded px-2 py-1"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading bills...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : bills.length === 0 ? (
            <p>No bills found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBills.map((bill) => (
                  <TableRow key={bill._id}>
                    <TableCell className="font-medium">
                      {bill._id?.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>{bill.customerName}</TableCell>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.items?.length || 0}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{bill.totalAmount?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => setViewBill(bill)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDownloadBill(bill)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Bill Modal */}
      <Modal
        isOpen={!!viewBill}
        onRequestClose={() => setViewBill(null)}
        contentLabel="View Bill"
        className="bg-white p-6 rounded-lg max-w-lg mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
      >
        {viewBill && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bill Details</h2>
            <p><strong>Bill ID:</strong> {viewBill._id}</p>
            <p><strong>Customer:</strong> {viewBill.customerName}</p>
            <p><strong>Date:</strong> {new Date(viewBill.date).toLocaleDateString()}</p>
            <p className="mt-2 font-semibold">Items:</p>
            <ul className="list-disc ml-5">
              {viewBill.items.map((item, idx) => (
                <li key={idx}>{item.name} - Qty: {item.quantity} - ₹{item.price}</li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ₹{viewBill.totalAmount}</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setViewBill(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Bills;
