import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
      generate: jest.fn(),
      find: jest.fn(),
    };
  };


  describe("Generate invoice usecase unit test", () => {
    it("should generate an invoice", async () => {
      const invoiceRepository = MockRepository();
      const usecase = new GenerateInvoiceUseCase(invoiceRepository);
  
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
                quantity: 1
            },
            {
                id: "2",
                name: "Invoice 2 item 2",
                price: 20,
                quantity: 1
            }
        ],
        total: 30
      };
  
      const result = await usecase.execute(input);
  
      expect(invoiceRepository.generate).toHaveBeenCalled();
      expect(result.id).toBeDefined;
      expect(result.name).toBe(input.name);
      expect(result.document).toBe(input.document);
      expect(result.street).toBe(input.street);
      expect(result.number).toBe(input.number);
      expect(result.complement).toBe(input.complement);
      expect(result.city).toBe(input.city);
      expect(result.state).toBe(input.state);
      expect(result.zipCode).toBe(input.zipCode);
      expect(result.items).toStrictEqual(input.items);
    });
  });