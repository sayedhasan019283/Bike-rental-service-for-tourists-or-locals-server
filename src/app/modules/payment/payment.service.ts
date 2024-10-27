import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";


const confirmationService = async (transactionId: string) => {
    console.log({transactionId})
    const verifyResponse = await verifyPayment(transactionId);
    console.log({verifyResponse});

    // let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        // result = await BookingModel.findOneAndUpdate({ transactionId }, {
        //     paymentStatus: 'Paid',
        //     isBooked: "Ended"
        // },{new: true});
        // console.log({result})
        message = "Successfully Paid!"
    }
    else {
        message = "Payment Failed!"
    }

    // eslint-disable-next-line no-undef
    const filePath = join(__dirname, '../../../views/confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}



export const paymentServices = {
    confirmationService,
}