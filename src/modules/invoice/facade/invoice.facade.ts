import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, 
{ FindInvoiceFacadeInputDto, 
  FindInvoiceFacadeOutputDto, 
  GenerateInvoiceFacedInputDto,
  GenerateInvoiceFacadeOutputDto 
}from "./invoice.facade.interface";

export interface UseCasesProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _findUseCase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCasesProps){
        this._findUseCase = useCaseProps.findUseCase;
        this._generateUseCase = useCaseProps.generateUseCase;
    }

    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._findUseCase.execute(input);
    }

    generate(input: GenerateInvoiceFacedInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateUseCase.execute(input);
    }
    
}