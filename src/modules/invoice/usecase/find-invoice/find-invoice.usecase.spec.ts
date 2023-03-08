import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address({
  street: "Invoice 1 Street", 
  number: "10", 
  complement: "Invoice 1 complement", 
  zipCode: "Invoice 1 zipCode", 
  state: "Invoice 1 state", 
  city: "Invoice 1 city",
});
const product1 = {
    id: new Id("1"),
    name: "Invoice 1 item 1",
    price: 10,
    quantity: 1
}
const product2 = {
    id: new Id("2"),
    name: "Invoice 2 item 2",
    price: 20,
    quantity: 1
}
const items = [new Product(product1), new Product(product2)]

const props = {
    id: new Id("1"),
    name: "Invoice 1",
    document: "Invoice 1 document",
    address: address,    
    items: items,
    total: 30
}

const invoice = new Invoice(props);

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("find a invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Invoice 1 document");
    expect(result.address.street).toBe("Invoice 1 Street");
    expect(result.address.number).toBe("10");
    expect(result.address.complement).toBe("Invoice 1 complement");
    expect(result.address.city).toBe("Invoice 1 city");
    expect(result.address.state).toBe("Invoice 1 state");
    expect(result.address.zipCode).toBe("Invoice 1 zipCode");
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Invoice 1 item 1");
    expect(result.items[0].price).toBe(10);
    expect(result.items[0].quantity).toBe(1);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Invoice 2 item 2");
    expect(result.items[1].price).toBe(20);
    expect(result.items[1].quantity).toBe(1);
  });
});
