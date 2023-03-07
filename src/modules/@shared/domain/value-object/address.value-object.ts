import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _zipCode: string;
    private _state: string;
    private _city: string;    

    constructor(street: string, number: string, complement: string, zipCode: string, state: string, city: string){
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._zipCode = zipCode;
        this._state = state;
        this._city = city;
        this.validate();
    }

    get street(): string {
        return this._street;
      }
    
      get number(): string {
        return this._number;
      }
    
      get complement(): string {
        return this._complement;
      }

      get zipCode(): string {
        return this._zipCode;
      }
    
      get state(): string {
        return this._state;
      }

      get city(): string {
        return this._city;
      }

    validate() {
        if (this._street.length === 0) {
          throw new Error("Street is required");
        }
        if (this._number.length === 0) {
          throw new Error("Number is required");
        }       
        if (this._zipCode.length === 0) {
          throw new Error("ZipCode is required");
        }
        if (this._state.length === 0) {
          throw new Error("State is required");
        }
        if (this._city.length === 0) {
          throw new Error("City is required");
        }
      }
    
      toString() {
        return `${this._street}, ${this._number}, ${this._complement}, ${this._zipCode} ${this._city}, ${this._state},`;
      }
}