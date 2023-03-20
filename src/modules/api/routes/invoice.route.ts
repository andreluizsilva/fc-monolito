import express, { Request, Response } from "express";
import InvoiceRepository from "../../invoice/repository/invoice.repository";
import FindInvoiceUseCase from "../../invoice/usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../../invoice/usecase/generate-invoice/generate-invoice.usecase";
import InvoicePresenter from "../presenters/invoice.presenter";



export const invoiceRoute = express.Router();

invoiceRoute.get("/", async(req: Request, res: Response) => {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository());

    try {
        const invoiceDto = {
            id: req.body.id,           
        }
        const output = await usecase.execute(invoiceDto);
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(InvoicePresenter.listXML(output)),
          });
    } catch (err) {
        res.status(500).send(err)
    }
})

invoiceRoute.post("/", async(req: Request, res: Response) => {
    const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());

    try {
        const invoiceDto = {
            id: req.body.id,
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items:  req.body.items.map((item: { id: string; name: string; price: number; }) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: req.body.total,                     
        }
        const output = await usecase.execute(invoiceDto);   
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
})