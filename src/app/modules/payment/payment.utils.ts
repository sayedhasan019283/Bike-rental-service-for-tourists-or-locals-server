import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async (paymentData: any) => {
    console.log("tarans -> ",paymentData.transactionId)
    try {
        const response = await axios.post(process.env.PAYMENT_URL!, {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNETURE_KEY,
            tran_id: paymentData.transactionId,
            success_url: `http://localhost:5000/api/confirmation?transactionId=${paymentData.transactionId}&status=success`,
            fail_url: `http://localhost:5000/api/confirmation?status=failed`,
            cancel_url: "http://localhost:5173/",
            amount: paymentData.totalCost,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.custormerName,
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: paymentData.customerPhone,
            type: "json"
        });

        console.log("intial payment => ",response);
        return response.data;
    }
    catch (err) {
        throw new Error("Payment initiation failed!")
    }
}


export const verifyPayment = async (tnxId: string) => {
    console.log({tnxId})
    try {
        console.log("store -> ",process.env.STORE_ID)
        console.log("signature -> ",process.env.SIGNETURE_KEY)
        const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
            params: {
                store_id: process.env.STORE_ID,
                signature_key: process.env.SIGNETURE_KEY,
                type: "json",
                request_id: tnxId
            }
        });
        console.log({response})
        return response.data;
    }
    catch (err) {
        console.log({err})
        throw new Error("Payment validation failed!")
    }
}