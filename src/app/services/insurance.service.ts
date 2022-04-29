import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';
import { Insurance } from './../models/insurance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private API_INSURANCE = 'http://localhost:9000';

  constructor(
    private http: HttpClient,
    private onOffService: OnlineOfflineService
  ) {
    this.listenConnectionStatus();
  }

  public saveApi(insurance: Insurance){
    this.http.post(this.API_INSURANCE + '/api/insurance', insurance).subscribe(
      () => alert('Seguro Cadastrado com Sucesso!'),
      (error) => console.log('erro ao cadasterar seguro')
    );
  }

  create(insurance: Insurance){
    if(this.onOffService.isOnline){
      this.saveApi(insurance);
    } else {
      console.log('salvar seguro no db local')
    }
  }

  list(): Observable<Insurance[]>{
    return this.http.get<Insurance[]>(this.API_INSURANCE + '/api/insurance');
  }

  listenConnectionStatus(){
    this.onOffService.statusConnection
      .subscribe(online =>{
        if(online){
          console.log('enviando os dados do meu banco local pra API');
        } else{
          console.log('estou offline');
        }
      });
  }

}
