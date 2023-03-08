export interface FindInvoiceFacadeInputDto {
    id: string;
  }
  
  export interface FindInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    createdAt: Date;
  }
  
  export interface GenerateInvoiceFacedInputDto {
    id?: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  }

  export interface GenerateInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;   
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;    
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
  }
  
  export default interface InvoiceFacadeInterface {
    find(
      input: FindInvoiceFacadeInputDto
    ): Promise<FindInvoiceFacadeOutputDto>;
    generate(input: GenerateInvoiceFacedInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
  }
  