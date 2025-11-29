// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { generateInvoicePDF } from "@/utils/invoicegenerator";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useCart, Product } from "@/context/CartContext";
// import {
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingCart,
//   Send,
//   Printer,
// } from "lucide-react";
// import { toast } from "sonner";

// const API_URL = "http://localhost:5000/api/bills";
// const PRODUCTS_API = "http://localhost:5000/api/products";
// const EMAIL_API = "http://localhost:5000/api/email/send";

// const Billing = () => {
//   const {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getSubtotal,
//     getTax,
//     getTotal,
//   } = useCart();

//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [customerEmail, setCustomerEmail] = useState("");

//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [generatedBill, setGeneratedBill] = useState(null);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(PRODUCTS_API);
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         toast.error("Failed to load products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Add product to cart
//   const handleAddToCart = () => {
//     const product = products.find((p) => p._id === selectedProduct);
//     if (product && quantity > 0) {
//       addToCart(
//         {
//           id: product._id,
//           name: product.name,
//           price: product.price,
//           category: product.category,
//           stock: product.stock,
//         },
//         quantity
//       );
//       toast.success(`Added ${product.name} to cart`);
//       setQuantity(1);
//     }
//   };

//   // Generate bill
//   const handleGenerateBill = async () => {
//     if (cart.length === 0) return toast.error("Cart is empty");
//     if (!customerName || !customerPhone)
//       return toast.error("Please enter customer details");

//     setIsLoading(true);

//     try {
//       // ⭐ FIX — store all totals BEFORE clearing cart
//       const subtotal = getSubtotal();
//       const tax = getTax();
//       const total = getTotal();

//       const billData = {
//         customerName,
//         customerPhone,
//         customerEmail,
//         items: cart.map((item) => ({
//           product: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         subtotal,
//         tax,
//         total,
//       };


//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(billData),
//       });

//       if (!response.ok) throw new Error("Failed to generate bill");

//       const result = await response.json();
//       setGeneratedBill(result);

//       toast.success(`Bill generated successfully! (ID: ${result._id})`);

//       clearCart(); // now safe
//       setCustomerName("");
//       setCustomerPhone("");
//       setSelectedProduct("");
//     } catch (error) {
//       toast.error("Error while generating bill");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Send Email
//   const handleSendEmail = async () => {
//     if (!customerEmail) return toast.error("Enter customer email");
//     if (!generatedBill) return toast.error("Generate bill first");

//     try {
//       const response = await fetch(EMAIL_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customerEmail,
//           customerName,
//           bill: generatedBill,
//           items: generatedBill.items,
//           totalAmount: generatedBill.total,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to send email");

//       toast.success("Email sent successfully!");
//     } catch (error) {
//       toast.error("Failed to send email");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">New Bill</h1>
//         <p className="text-muted-foreground">Create a new billing invoice</p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Customer Details */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Customer Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Customer Name *</Label>
//                 <Input
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter customer name"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Phone Number *</Label>
//                 <Input
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Email (Optional)</Label>
//                 <Input
//                   type="email"
//                   value={customerEmail}
//                   onChange={(e) => setCustomerEmail(e.target.value)}
//                   placeholder="Enter email address"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Add Products */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Add Products</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Select Product</Label>
//                 <Select
//                   value={selectedProduct}
//                   onValueChange={setSelectedProduct}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose a product" />
//                   </SelectTrigger>

//                   <SelectContent className="bg-popover">
//                     {products.map((product) => (
//                       <SelectItem key={product._id} value={product._id}>
//                         {product.name} - ₹{product.price}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Quantity</Label>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>

//                   <Input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={(e) =>
//                       setQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                     }
//                     className="text-center"
//                   />

//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setQuantity(quantity + 1)}
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleAddToCart}
//                 className="w-full"
//                 disabled={!selectedProduct}
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add to Cart
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Cart Items */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <ShoppingCart className="h-5 w-5" />
//                 Cart Items ({cart.length})
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               {cart.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">
//                   No items in cart
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between p-3 border rounded-lg"
//                     >
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-sm text-muted-foreground">
//                           ₹{item.price} × {item.quantity}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>

//                         <span className="w-8 text-center text-sm">
//                           {item.quantity}
//                         </span>

//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>

//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8 text-destructive"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Bill Summary */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Bill Summary</CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal:</span>
//                   <span className="font-medium">
//                     ₹{getSubtotal().toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">GST (18%):</span>
//                   <span className="font-medium">₹{getTax().toFixed(2)}</span>
//                 </div>

//                 <div className="border-t pt-2">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total:</span>
//                     <span className="text-primary">
//                       ₹{getTotal().toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2 pt-4">
//                 <Button
//                   onClick={handleGenerateBill}
//                   className="w-full"
//                   size="lg"
//                   disabled={isLoading}
//                 >
//                   <Printer className="mr-2 h-4 w-4" />
//                   {isLoading ? "Generating..." : "Generate Bill"}
//                 </Button>

//                 <div className="grid grid-cols-2 gap-2">
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={handleSendEmail}
//                   >
//                     <Send className="mr-2 h-4 w-4" />
//                     Email
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;





import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateInvoicePDF } from "@/utils/invoicegenerator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, Product } from "@/context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Send,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api/bills";
const PRODUCTS_API = "http://localhost:5000/api/products";
const EMAIL_API = "http://localhost:5000/api/email/send";

const Billing = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBill, setGeneratedBill] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const handleAddToCart = () => {
    const product = products.find((p) => p._id === selectedProduct);
    if (product && quantity > 0) {
      addToCart(
        {
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          stock: product.stock,
        },
        quantity
      );
      toast.success(`Added ${product.name} to cart`);
      setQuantity(1);
    }
  };

  // Generate bill
  const handleGenerateBill = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");
    if (!customerName || !customerPhone)
      return toast.error("Please enter customer details");

    setIsLoading(true);

    try {
      // ⭐ FIX — store all totals BEFORE clearing cart
      const subtotal = getSubtotal();
      const tax = getTax();
      const total = getTotal();

      const billData = {
        customerName,
        customerPhone,
        customerEmail,
        items: cart.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        tax,
        total,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billData),
      });

      if (!response.ok) throw new Error("Failed to generate bill");

      const result = await response.json();
      setGeneratedBill(result);

      toast.success(`Bill generated successfully! (ID: ${result._id})`);

      // -----------------------------------------------------
      // ⭐ NEW → Auto-generate PDF with simple clean format
      // -----------------------------------------------------
      generateInvoicePDF(result);
      // -----------------------------------------------------

      clearCart(); // now safe
      setCustomerName("");
      setCustomerPhone("");
      setSelectedProduct("");
    } catch (error) {
      toast.error("Error while generating bill");
    } finally {
      setIsLoading(false);
    }
  };

  // Send Email
  const handleSendEmail = async () => {
    if (!customerEmail) return toast.error("Enter customer email");
    if (!generatedBill) return toast.error("Generate bill first");

    try {
      const response = await fetch(EMAIL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          customerName,
          bill: generatedBill,
          items: generatedBill.items,
          totalAmount: generatedBill.total,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">New Bill</h1>
        <p className="text-muted-foreground">Create a new billing invoice</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Name *</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label>Email (Optional)</Label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Products */}
          <Card>
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>

                  <SelectContent className="bg-popover">
                    {products.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name} - ₹{product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="text-center"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full"
                disabled={!selectedProduct}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart Items ({cart.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No items in cart
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bill Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Bill Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%):</span>
                  <span className="font-medium">₹{getTax().toFixed(2)}</span>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      ₹{getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleGenerateBill}
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  {isLoading ? "Generating..." : "Generate Bill"}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSendEmail}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
