import { toXML } from "jstoxml";
import { FindInvoiceUseCaseOutputDTO } from "../../invoice/usecase/find-invoice/find-invoice.dto";


export default class InvoicePresenter {
  static listXML(data: FindInvoiceUseCaseOutputDTO): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
          invoice: {
            id: data.id,
            name: data.name,
            document: data.document,
            address: {
              street: data.address.street,
              number: data.address.number,
              complement: data.address.complement,
              city: data.address.city,
              state: data.address.state,
              zipCode: data.address.zipCode,
            },
            items: data.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            total: data.total,
            createdAt: data.createdAt
            },
        }, 
        xmlOption 
    );
  }
}