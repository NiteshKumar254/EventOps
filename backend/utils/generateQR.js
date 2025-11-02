import QRCode from "qrcode";

export const generateQRCode = async (ticketId) => {
  try {
    // Generates Base64 QR code
    const qrData = await QRCode.toDataURL(ticketId);
    return qrData;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};
