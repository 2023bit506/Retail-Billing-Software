export const createBill = async (billData: any) => {
  try {
    const response = await fetch("http://localhost:5000/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create bill");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error creating bill:", error);
    throw error;
  }
};
