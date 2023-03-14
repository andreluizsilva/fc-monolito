import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
    {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      zipCode: invoice.address.zipCode,
      state: invoice.address.state,
      city: invoice.address.city,
      items: invoice.items.map((item) => {
        return {
          id: item.id.id,          
          name: item.name,
          price: item.price,
        }        
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      include: [{ model: ProductModel }]
    }
    );
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id: id },
      include: ["items"],
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

   return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street, 
        number: invoice.number, 
        complement: invoice.complement, 
        zipCode: invoice.zipCode, 
        state: invoice.state, 
        city: invoice.city,
      }),
      items: invoice.items.map((item) => {
        return new Product({ 
            id: new Id(item.id),               
            name: item.name,
            price: item.price,
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
