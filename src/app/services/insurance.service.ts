import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';
import { Insurance } from './../models/insurance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private API_INSURANCE = 'http://localhost:9000';
  private db!: Dexie;
  private table!: Dexie.Table<Insurance, any>;

  constructor(
    private http: HttpClient,
    private onOffService: OnlineOfflineService
  ) {
    this.listenConnectionStatus();
    this.startIndexedDb();
  }

  private startIndexedDb(){
    this.db = new Dexie('insurance-db');
    this.db.version(1).stores({
      insurance: 'id'
    });
    this.table = this.db.table('insurance');
  }

  public saveApi(insurance: Insurance){
    this.http.post(this.API_INSURANCE + '/api/insurance', insurance).subscribe(
      () => alert('Seguro Cadastrado com Sucesso!'),
      (error) => console.log('erro ao cadasterar seguro')
    );
  }

  private async saveIndexedDb(insurance: Insurance){

    try{
      await this.table.add(insurance);
      const allInsurances: Insurance[] = await this.table.toArray();
      console.log("Seguro salvo no Indexed Db: ", allInsurances);

    } catch(error){
      console.log('Erro ao add seguro no indexedDb: ', error);
    }
  }

  private async sendIndexedDbToApi(){
    const allInsurances: Insurance[] = await this.table.toArray();

    for(const insurance of allInsurances){
      this.saveApi(insurance);
      await this.table.delete(insurance.id);
      console.log(`seguro com id: ${insurance.id} foi deletado`)
    }

  }

  create(insurance: Insurance){
    if(this.onOffService.isOnline){
      this.saveApi(insurance);
    } else {
      this.saveIndexedDb(insurance);
    }
  }

  list(): Observable<Insurance[]>{
    return this.http.get<Insurance[]>(this.API_INSURANCE + '/api/insurance');
  }

  listenConnectionStatus(){
    this.onOffService.statusConnection
      .subscribe(online =>{
        if(online){
          this.sendIndexedDbToApi();
        } else{
          console.log('estou offline');
        }
      });
  }

}
