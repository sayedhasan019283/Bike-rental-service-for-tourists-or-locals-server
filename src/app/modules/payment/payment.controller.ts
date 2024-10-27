import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
    const { transactionId } = req.query;
     console.log("req query=> ",req.query)

    try {
        const result = await paymentServices.confirmationService(transactionId as string);
        res.send(result)
    } catch (error) {
        console.log({error})
    }
    
};


export const paymentController = {
    confirmationController,
}