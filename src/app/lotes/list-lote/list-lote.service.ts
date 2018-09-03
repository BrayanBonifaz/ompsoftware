import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {loteX } from '../../entity/lote';
import {Planilla} from '../../entity/planilla';
import {respuestaService} from '../../entity/respuestaService';

@Injectable()
export class ListLoteService {

  constructor(private http: HttpClient) { }
  apiRoot: string = 'http://10.10.5.241:8090/suraLotizacion';

  listarPorFechaAfectados(desdeFecha: string, hastaFecha: string,  numAfectados:number, desdeRegistro:number , hastaRegistro: number) {
    console.log("Inside listarPorFechaAfectados");
    
    let params = new HttpParams();
    params = params.append('desdeFecha', desdeFecha + "");
    params = params.append('hastaFecha', hastaFecha + "");
    params = params.append('desdeRegistro', desdeRegistro + "");
    params = params.append('hastaRegistro', hastaRegistro + "");
    
    if(numAfectados!=0){
      params = params.append('cantAfiliados', numAfectados + "");
    }

    let url = `${this.apiRoot}/api/planilla`;
    return this.http.get<respuestaService>(url, { params: params });
  }

  listarPorPlanilla(numPlanilla:number) {
    
    let url = `${this.apiRoot}/api/planilla/`+numPlanilla;
    console.log("Inside listarPorPlanilla");
    return this.http.get<respuestaService>(url);
    
  }

  grabarLote(descripcion:String,fechaProceso:Date,selectedPlanillas:Array<any>){
    let headers = new HttpHeaders().set('content-Type','application/json; charset=utf-8');
    let lote : loteX;
    let numAfiliados = 0;
    for(let i=0;i<selectedPlanillas.length;i++){
      numAfiliados = numAfiliados +  (+selectedPlanillas[i].cantAfiliados);
    }
    console.log(numAfiliados);
    lote = new loteX(0,0,"",descripcion,fechaProceso,null,null,null,numAfiliados,"",selectedPlanillas);
    console.log(lote);
    //return this.http.post("/api/lote/crear",{"Loac_Descripcion": referencia,"Loac_Fecha_Proc": fechaProceso,"Loac_Flag_Simulacion": simulacion});
        
    let url = `${this.apiRoot}/api/lote/crear`;
    console.log("Inside grabarLote");
    return this.http.post<respuestaService>(url ,JSON.stringify(lote),{headers: headers});
  }



}
