import { CarBrand } from './car-brand.model';

export class Insurance{
  id!: string;
  carBrand!: CarBrand;
  carModel!: string;
  licensePlate!: string;
  ownerFirstName!: string;
  ownerLastName!: string;
  ownerDateBirth!: string;
}
