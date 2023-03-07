import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id: Id;
    name: string;    
    price: number;
    quantity: number;
  };
  
  export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;
    private _quantity: number;

  
    constructor(props: ProductProps) {
      super(props.id);
      this._name = props.name;
      this._price = props.price;
      this._quantity = props.quantity;
    }
  
    get name(): string {
      return this._name;
    }
  
    get price(): number {
      return this._price;
    }

    get quantity(): number {
      return this._quantity;
    }
    
    invoiceItemTotal(): number {
      return this._quantity * this._price;
    }
  }