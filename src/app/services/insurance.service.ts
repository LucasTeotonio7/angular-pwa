import { Observable } from 'rxjs';
import { Insurance } from './../models/insurance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private API_INSURANCE = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  create(insurance: Insurance){
    this.http.post(this.API_INSURANCE + '/api/insurance', insurance).subscribe(
      () => alert('Seguro Cadastrado com Sucesso!'),
      (error) => console.log('erro ao cadasterar seguro')
    );
  }

  list(): Observable<Insurance[]>{
    return this.http.get<Insurance[]>(this.API_INSURANCE + '/api/insurance');
  }

}
