import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CarBrand } from '../models/car-brand.model';

interface CarResponse{
  Makes: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  private _CARS_API_URL = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes'
  private CARS_API_URL = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=2000&sold_in_us=1'

  constructor(
    private http: HttpClient
  ) { }

  private mapBrands(brands: any): CarBrand[]{
    return brands.map((brand:any) => ({
      code: brand.make_id,
      name: brand.make_display
    }));
  }


  getBrands(): Observable<CarBrand[]>{
    return this.http.jsonp(this.CARS_API_URL, 'callback')
    .pipe(
      map((res:any) => this.mapBrands((res.Makes)))
    )
  }
}
