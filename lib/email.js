import emailjs from "@emailjs/browser";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export const sendAdminOrderNotification = async (orderData) => {
    try {
        if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
            throw new Error("EmailJS Keys are missing in .env");
        }

        const itemsList = orderData.items
            .map(
                (item) =>
                    `${item.title} (x${item.quantity}) - ${item.totalPrice} MAD`
            )
            .join("\n");

        // CORRECTLY MAPPED TO YOUR CheckoutPage.jsx DATA
        const templateParams = {
            // Target Recipient
            email: "yassinehamdoune55@gmail.com", 
            
            // Customer Details (from formData)
            user_name: orderData.fullName || "Guest",
            user_email: orderData.email || "No Email",
            user_phone: orderData.phone || "No Phone",
            user_address: `${orderData.address || ""}, ${orderData.city || ""}`.trim() || "No Address",
            user_notes: orderData.notes || "No additional notes provided.",
            
            // Order Details
            items_list: itemsList,
            total_amount: `${orderData.totalAmount || 0} MAD`,
            
            // Metadata
            from_name: "ARABI SHOP System",
        };



        const result = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );


        return result;
    } catch (error) {

        throw error;
    }
};