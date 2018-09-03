import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SolicitudService {

  constructor(private http: HttpClient) { }
  apiRoot: string = 'http://10.10.5.241:8090/suraLotizacion';

  getSolicitud(desde: number, hasta: number) {
    let params = new HttpParams();
    params = params.append('desdeRegistro', desde + "");
    params = params.append('hastaRegistro', hasta + "");
    let url = `${this.apiRoot}/api/solicitud`;
    return this.http.get(url, { params: params });
  }

  saveSolicitud(data){
    let url = `${this.apiRoot}/api/solicitud`;
    return this.http.post(url, data);
  }

  procesar(idSolicitud:number, fecha:string, usuario:string ){
    console.log("Inside procesar -> " + idSolicitud);
    let url = `${this.apiRoot}/api/solicitud/procesarCarga`;
    
    let params = new HttpParams();
    params = params.append('id', idSolicitud + "");
    params = params.append('fecha', fecha + "");
    params = params.append('usuario', usuario + "");
    return this.http.get(url, { params: params });
  }


  aprobarSolicitud(idSolRep: string, pUsuSis: string ){
    
    let params = new HttpParams();
    params = params.append('idSolRep', idSolRep + "");
    params = params.append('pUsuSis', pUsuSis + "");

    let url = `${this.apiRoot}/api/solicitud/aprobarSolicitud`;
    
    return this.http.get(url, { params: params });
  }





  getSolicitudByCodigo(codigo:string){
    let url = `${this.apiRoot}/api/solicitud`+ codigo;
    return this.http.get(url);
  }

  anularSolicitudes(data){
    console.log("anularSolicitudes = "+data);
    let url = `${this.apiRoot}/api/solicitud/anular`;
    return this.http.post(url, {"codigosDeSolicutud": data,"usuario": "vide"});
  }
}
