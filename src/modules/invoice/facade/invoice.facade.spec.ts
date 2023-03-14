import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/faced.factory";
import InvoiceModel from "../repository/invoice.model";
import ProductModel from "../repository/product.model";


const input = {
  id: "1",
  name: "Invoice 1",
  document: "Invoice 1 document",
  street: "Invoice 1 Street",
  number: "10",
  complement: "Invoice 1 complement",
  city: "Invoice 1 city",
  state: "Invoice 1 state",
  zipCode: "Invoice 1 zipCode",
  items: [
      {
          id: "1",
          name: "Invoice 1 item 1",
          price: 10,
      },
      {
          id: "2",
          name: "Invoice 2 item 2",
          price: 20,
      }
  ], 
};

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel, ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should generate an invoice", async () => {    
      // const invoiceRepository = new InvoiceRepository();
      // const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
      
      // const invoiceFacade = new InvoiceFacade({
      //     findUseCase: undefined,
      //     generateUseCase: generateInvoiceUseCase,
      // })
      
      const invoiceFacade = InvoiceFacadeFactory.create();

      const output = await invoiceFacade.generate(input);
      
      const invoiceDb = await InvoiceModel.findOne({ where: {id: input.id}, include: ["items"] });
  
      expect(invoiceDb).toBeDefined();
      expect(invoiceDb).not.toBeNull();
      expect(invoiceDb.id).toBe(input.id);
      expect(invoiceDb.name).toBe(input.name);
      expect(invoiceDb.document).toBe(input.document);
      expect(invoiceDb.street).toBe(input.street);
      expect(invoiceDb.number).toBe(input.number);
      expect(invoiceDb.complement).toBe(input.complement);
      expect(invoiceDb.zipCode).toBe(input.zipCode);
      expect(invoiceDb.state).toBe(input.state);
      expect(invoiceDb.city).toBe(input.city);
      expect(invoiceDb.items.length).toBe(2);
      expect(invoiceDb.items[0].id).toBe(input.items[0].id)
      expect(invoiceDb.items[0].name).toBe(input.items[0].name);
      expect(invoiceDb.items[0].price).toBe(input.items[0].price);
      expect(invoiceDb.items[1].id).toBe(input.items[1].id)
      expect(invoiceDb.items[1].name).toBe(input.items[1].name);
      expect(invoiceDb.items[1].price).toBe(input.items[1].price);
    });
  
    it("should find an invoice", async () => {
      // const invoiceRepository = new InvoiceRepository();
      // const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
      // const invoiceFacade = new InvoiceFacade({
      //     findUseCase: findInvoiceUseCase,
      //     generateUseCase: undefined,
      // })
      
      const invoiceFacade = InvoiceFacadeFactory.create();

      await invoiceFacade.generate(input);
  
      const invoiceDb = await invoiceFacade.find({id: input.id})
  
      expect(invoiceDb).toBeDefined();
      expect(invoiceDb).not.toBeNull();
      expect(invoiceDb.id).toBe(input.id);
      expect(invoiceDb.name).toBe(input.name);
      expect(invoiceDb.document).toBe(input.document);
      expect(invoiceDb.address.street).toBe(input.street);
      expect(invoiceDb.address.number).toBe(input.number);
      expect(invoiceDb.address.complement).toBe(input.complement);
      expect(invoiceDb.address.zipCode).toBe(input.zipCode);
      expect(invoiceDb.address.state).toBe(input.state);
      expect(invoiceDb.address.city).toBe(input.city);
      expect(invoiceDb.items.length).toBe(2);
      expect(invoiceDb.items[0].id).toBe(input.items[0].id)
      expect(invoiceDb.items[0].name).toBe(input.items[0].name);
      expect(invoiceDb.items[0].price).toBe(input.items[0].price);
      expect(invoiceDb.items[1].id).toBe(input.items[1].id)
      expect(invoiceDb.items[1].name).toBe(input.items[1].name);
      expect(invoiceDb.items[1].price).toBe(input.items[1].price);
    });
})

  