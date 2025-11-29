import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api/settings";

const Settings = () => {
  const [settings, setSettings] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
    gst: 18,
    discount: 0,
    lowStockAlert: false,
    dailyReport: false,
  });

  // Load settings from backend
  const fetchSettings = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSettings(data);
    } catch {
      toast.error("Failed to load settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Update fields
  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  // Save to backend
  const handleSave = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error();

      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage system configuration and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={settings.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Tax & Pricing</CardTitle>
            <CardDescription>Configure tax rates and pricing rules</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GST (%)</Label>
                <Input
                  type="number"
                  value={settings.gst}
                  onChange={(e) => handleChange("gst", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Discount (%)</Label>
                <Input
                  type="number"
                  value={settings.discount}
                  onChange={(e) => handleChange("discount", Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure alerts and reports</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Low Stock Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Notify when product stock becomes low
                </p>
              </div>
              <Button
                variant={settings.lowStockAlert ? "default" : "outline"}
                onClick={() => handleChange("lowStockAlert", !settings.lowStockAlert)}
              >
                {settings.lowStockAlert ? "Enabled" : "Enable"}
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Sales Report</p>
                <p className="text-sm text-muted-foreground">
                  Receive daily email summary
                </p>
              </div>
              <Button
                variant={settings.dailyReport ? "default" : "outline"}
                onClick={() => handleChange("dailyReport", !settings.dailyReport)}
              >
                {settings.dailyReport ? "Enabled" : "Enable"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
