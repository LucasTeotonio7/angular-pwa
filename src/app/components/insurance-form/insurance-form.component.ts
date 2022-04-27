import { InsuranceService } from './../../services/insurance.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CarBrandService } from './../../services/car-brand.service';
import { CarBrand } from './../../models/car-brand.model';
import { Insurance } from 'src/app/models/insurance.model';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {

  public insurance = new Insurance()
  public carBrands$!: Observable<CarBrand[]>

  constructor(
    private carBrandService: CarBrandService,
    private insuranceService: InsuranceService
  ) { }

  ngOnInit(): void {
    this.carBrands$ = this.carBrandService.getBrands();
  }

  create(){
    this.insuranceService.create(this.insurance);
  }

  sendNotification(){

  }

}
