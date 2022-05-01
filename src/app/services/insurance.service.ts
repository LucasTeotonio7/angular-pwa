import { Insurance } from './../models/insurance.model';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService extends BaseService<Insurance> {

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'insurance', 'http://localhost:9000/api/insurance');
  }

}
