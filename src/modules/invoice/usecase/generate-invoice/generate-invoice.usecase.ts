import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway){
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>{
        
        const address = new Address({
            street: input.street, 
            number: input.number, 
            complement: input.complement, 
            zipCode: input.zipCode, 
            state: input.state, 
            city: input.city 
        });
        const items = input.items.map(item => {
            return new Product({ 
                id: new Id(item.id),               
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })
        })

        const props = {   
            id: new Id(input.id),         
            name: input.name,
            document: input.document,
            address: address,
            items: items,           
        }       

        const invoice = new Invoice(props);
        this._invoiceRepository.generate(invoice);

        return{
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,            
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }                
            }),
            total: invoice.total(),
        }
    }
}