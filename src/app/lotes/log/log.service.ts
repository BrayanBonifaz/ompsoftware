import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }
  getLog(desde: number, hasta: number, desdeFecha: string, hastaFecha: string, lote_id:number) {
    let params = new HttpParams();
    params = params.append('desdeRegistro', desde + "");
    params = params.append('hastaRegistro', hasta + "");
    params = params.append('desdeFecha', desdeFecha + "");
    params = params.append('hastaFecha', hastaFecha + "");
    params = params.append('lote_id', lote_id + "");
    return this.http.get("/api/log", { params: params });
  }
}
