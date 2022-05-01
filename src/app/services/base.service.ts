import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Dexie from 'dexie';
import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends { id?: string }> {

  private db!: Dexie;
  private table!: Dexie.Table<T, any>;

  protected http: HttpClient;
  protected onOffService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    @Inject(String) protected tableName: string,
    @Inject(String) protected UrlApi: string,
  ) {
    this.http = this.injector.get(HttpClient);
    this.onOffService = this.injector.get(OnlineOfflineService);

    this.listenConnectionStatus();
    this.startIndexedDb();
  }

  private startIndexedDb(){
    this.db = new Dexie('insurance-db');
    this.db.version(1).stores({
      [this.tableName]: 'id'
    });
    this.table = this.db.table(this.tableName);
  }

  public saveApi(object: T){
    this.http.post(this.UrlApi, object).subscribe(
      () => alert('Cadastrado com Sucesso!'),
      (error) => console.log('erro ao cadastrar')
    );
  }

  private async saveIndexedDb(object: T){

    try{
      await this.table.add(object);
      const allObjects: T[] = await this.table.toArray();
      console.log("Salvo no Indexed Db: ", allObjects);

    } catch(error){
      console.log('Erro ao add no indexedDb: ', error);
    }
  }

  private async sendIndexedDbToApi(){
    const allObjects: T[] = await this.table.toArray();

    for(const object of allObjects){
      this.saveApi(object);
      await this.table.delete(object.id);
      console.log(`seguro com id: ${object.id} foi deletado`)
    }

  }

  create(object: T){
    if(this.onOffService.isOnline){
      this.saveApi(object);
    } else {
      this.saveIndexedDb(object);
    }
  }

  list(): Observable<T[]>{
    return this.http.get<T[]>(this.UrlApi);
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
