import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class Solicitudv2Service {

  constructor(private http: HttpClient) { }
  apiRoot: string = 'http://10.10.5.241:8090/suraLotizacion';

  getSolicitudv2(desde: number, hasta: number) {
    let params = new HttpParams();
    params = params.append('desdeRegistro', desde + "");
    params = params.append('hastaRegistro', hasta + "");
    let url = `${this.apiRoot}/api/solicitud`;
    return this.http.get(url, { params: params });
  }

  saveSolicitudv2(data){
    let url = `${this.apiRoot}/api/solicitud`;
    return this.http.post(url, data);
  }

  procesar(idSolicitudv2:number, fecha:string, usuario:string ){
    console.log("Inside procesar -> " + idSolicitudv2);
    let url = `${this.apiRoot}/api/solicitud/procesarCarga`;
    
    let params = new HttpParams();
    params = params.append('id', idSolicitudv2 + "");
    params = params.append('fecha', fecha + "");
    params = params.append('usuario', usuario + "");
    return this.http.get(url, { params: params });
  }


  aprobarSolicitudv2(idSolRep: string, pUsuSis: string ){
    
    let params = new HttpParams();
    params = params.append('idSolRep', idSolRep + "");
    params = params.append('pUsuSis', pUsuSis + "");

    let url = `${this.apiRoot}/api/solicitud/aprobarSolicitudv2`;
    
    return this.http.get(url, { params: params });
  }





  getSolicitudv2ByCodigo(codigo:string){
    let url = `${this.apiRoot}/api/solicitud`+ codigo;
    return this.http.get(url);
  }

  anularSolicitudv2es(data){
    console.log("anularSolicitudv2es = "+data);
    let url = `${this.apiRoot}/api/solicitud/anular`;
    return this.http.post(url, {"codigosDeSolicutud": data,"usuario": "vide"});
  }
}
