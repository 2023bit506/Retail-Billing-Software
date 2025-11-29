import axios from "axios";

export const sendWhatsappMessage = async (phone, message) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WA_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data || error.message };
  }
};
