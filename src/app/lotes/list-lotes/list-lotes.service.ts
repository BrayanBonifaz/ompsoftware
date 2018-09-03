import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {loteX } from '../../entity/lote';
import {Planilla} from '../../entity/planilla';
import {respuestaService} from '../../entity/respuestaService';

@Injectable()
export class ListLotesService {

  constructor(private http: HttpClient) { }
  apiRoot: string = 'http://10.10.5.241:8090/suraLotizacion';
  apiRootAcre: string = 'http://10.10.5.241:8090/suraAcreditacion/procesar';

  getLotes(desde: number, hasta: number) {
    let params = new HttpParams();
    params = params.append('desdeRegistro', desde + "");
    params = params.append('hastaRegistro', hasta + "");
    let url = `${this.apiRoot}/api/lote`;
    return this.http.get<respuestaService>(url, { params: params });
  }

  listarLotePlanilla(numLote:number,desde:number,hasta:number) {
    console.log("Inside listarPorPlanilla");
    let params = new HttpParams();
    params = params.append('numeroLote', numLote + "");
    params = params.append('desde', desde + "");
    params = params.append('hasta', hasta + "");
    let url = `${this.apiRoot}/api/lote/planillas`;
    return this.http.get<respuestaService>(url,{ params: params });
    
  }

  saveLote(data){
    console.log("Inside saveLote");
    let url = `${this.apiRoot}/api/lote`;
    return this.http.post(url, data);
  }

  actualizarLote(id:number,descripcion:String,fechaProceso:Date,simulacion:String){
    let headers = new HttpHeaders().set('content-Type','application/json; charset=utf-8');
    let lote : loteX;
    let BSimulacion : Boolean;
    if(simulacion == "S"){
      BSimulacion = false;
    }
    if(simulacion == "N"){
      BSimulacion = true;
    }
    //lote = new loteX(id,descripcion,fechaProceso,BSimulacion,null,null);
    //return null;
    let url = `${this.apiRoot}/api/lote/actualizar`;
    return this.http.post<respuestaService>(url,JSON.stringify(lote),{headers: headers});
  }
  
  procesar(n_loac_id:number,tipoProceso:String){
    console.log("Inside procesar");
    let url = `${this.apiRootAcre}`;
    let colc = {  "lote":n_loac_id,
                  "usuario":"hpotter",
                  "tipoProceso":tipoProceso
                };
    console.log(colc);
    console.log("json enviado = " + colc);
    let headers = new HttpHeaders().set('content-Type','application/json; charset=utf-8');
    return this.http.post<respuestaService>(url, JSON.stringify(colc) , {headers: headers});
  }

  anular(n_loac_id:number){
    console.log("Inside anular");
    let url = `${this.apiRoot}/api/lote/anular/`+n_loac_id;
   // let params = new HttpParams();
    //params = params.append('loteId', n_loac_id + "");
    //let url = `${this.apiRootAcre}/anular`;
    /*
    let colc = {  "lote":n_loac_id

                };*/
    //console.log("json enviado = " + colc);
    //let headers = new HttpHeaders().set('content-Type','application/json; charset=utf-8');
    //return this.http.post<respuestaService>(url, JSON.stringify(colc) , {headers: headers});
     return this.http.get<respuestaService>(url);
  }
}
