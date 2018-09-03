
import { Component, OnInit } from '@angular/core';
import {ListLotesService} from './list-lotes.service';
import {DatePipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import 'rxjs/add/operator/take';
import { NotificationService } from '../../core/components/notification/notification.service';
//import { Router, ROUTER_PROVIDERS } from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {Planilla} from '../../entity/planilla';
import {respuestaService} from '../../entity/respuestaService';
import {Observable} from 'rxjs/Rx';
import { loteX } from '../../entity/lote';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-lotes',
  templateUrl: './list-lotes.component.html',
  styleUrls: ['./list-lotes.component.scss'],
  providers: [DatePipe,ConfirmationService,ListLotesService]
})
export class ListLotesComponent implements OnInit {
  displayModal: boolean = false;
  displayProgressBar: boolean = false;
  titleModal: string;
  myDate: Date = new Date();
  minDate: Date = new Date();
  selectedLotes: any[];
  selectedLote: any;
  isLoading = false;
  isPreview = false;
  curSolicitud: any;

  rows : loteX[];
  datasource: loteX[];
  rowsM: Planilla[];
  datasourceM: Planilla[];
  totalRecordsM: number = 0;
  isLoadingM = false;
  id_lote: number;
  cols: any[];

  page = { sizePerPage: 50, totalElements: 0, index: 0 };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private listlotesService: ListLotesService,
              private confirmationService: ConfirmationService,
              private notificationService: NotificationService,
              private datePipe: DatePipe
              
              ) { }
 
  ngOnInit() {
    Observable.interval(1000 * 60).subscribe(x => {
      if (this.router.url =="/lotes"){
        if (this.datasource && (this.datasource.filter(row => row.estadoLote =='EJS' || row.estadoLote =='EJA').length >= 1))
          this.ListarLote(null);
      }
    });
      
  }

  loadLoteModalLazy(event) {
    this.isLoadingM = true;
    if (this.datasourceM) {
        this.rowsM = this.datasourceM.slice(event.first, (event.first + event.rows));
        this.isLoadingM = false;
    }
  }

  loadLoteLazy(params) {
    this.ListarLote(params);
  }

/*
  onPageChange(event){
    console.log("event : ");
    this.loadLoteLazy(event);
  }*/

  validarBotonRegistrarLote(){
    if( (this.datasource) && (this.datasource.length > 0)){
      return this.datasource.filter(row => row.estadoLote =='PEN' || row.estadoLote =='SIM'|| row.estadoLote =='ERS'|| row.estadoLote =='ERA'|| row.estadoLote =='EJS' || row.estadoLote =='EJA').length == 0;
    }
    return true;
  }

  ListarLote(params){
    let _date = new Date();
    console.log(_date);
    console.log(this.router.url);
    this.isLoading = true;
    //let desde = (params.first | 0) + 1;
    //let hasta = desde + (params.rows | 0) - 1;
    let desde = 1;
    let hasta = 2000;
    
    this.showModalProgressBar();
    this.listlotesService.getLotes(desde, hasta).take(1).subscribe(data => {
      this.hideModalProgressBar();
      let _res = new respuestaService(null,null,null);
      _res = data;
      if(_res.codigo == "1"){
        this.datasource = _res.datos.lotes;
        this.rows = this.datasource;
        this.page.totalElements = _res.datos.cantRegistros;
        this.isLoading = false;
      } else{
        let _msj = _res.mensaje;
        this.notificationService.notify('warn','Listar Lote', 'Ocurrio un error.');
      }
    },
    error=>{
      this.hideModalProgressBar();
      this.notificationService.notify('error', 'Listar Lote', 'Ocurrio un error.');
    });
    
  }

  ListarLotePlanillaModal(){ 
    let desde = 1;
    let hasta = 2000;
    if (this.id_lote){
      this.showModalProgressBar();
      this.isLoadingM = true;
      this.listlotesService.listarLotePlanilla(this.id_lote,desde,hasta).subscribe(data => {
          
          let _res = new respuestaService(null,null,null);
          _res = data;
          if(_res.codigo == "1"){
            this.datasourceM = _res.datos.planillas;
            this.rowsM = this.datasourceM;
            this.totalRecordsM =  _res.datos.cantRegistros;
            this.isLoadingM = false;
          }else{
            let _msj = _res.mensaje;
            this.notificationService.notify('warn','Listar planillas', 'Ocurrio un error.');
         }    
         this.hideModalProgressBar(); 
      },
      error=>{
        this.hideModalProgressBar();
        this.notificationService.notify('error', 'Listar planillas', 'Ocurrio un error.');
      });
    }
  }

  actualizar(id:number,descripcion:String,fechaProceso:Date,simulacion:String,estado:String){
    console.log(id);
    console.log(descripcion);
    console.log(fechaProceso);
    console.log(simulacion);
    console.log(estado);
    this.isLoading = true;
    if(estado == "Pendiente"){
      this.showModalProgressBar();
      this.listlotesService.actualizarLote(id,descripcion,fechaProceso,simulacion).subscribe(data => {
        this.hideModalProgressBar();
        let _cod = data['codigo'];
         if(_cod == "1"){
            this.notificationService.notify('success', 'Actualizar Lote', 'Se actualizo exitosamente');
            this.page.index = 0;
            this.isLoading = false;
            this.displayModal = false;
            console.log(data);
         }else{
            //let _msj : string = data['mensaje'];
            this.notificationService.notify('warn','Actualizar Lote', 'Ocurrio un error.');
         }
        
        this.loadLoteLazy({first:0, rows:50});
      },
      error=>{
        this.hideModalProgressBar();
        this.notificationService.notify('error', 'Actualizar Lote', 'Ocurrio un error.');
      });
    }else{
      this.notificationService.notify('warn', 'Actualizar Lote', 'No se puede actualizar lote con estado '+estado);
    }
  }

  acreditar(n_loac_id:number){
    console.log(n_loac_id);
    let tipoProceso = "A";
    let codEstado = "EJA";
    let estadoDes = "Acreditando";

    this.confirmationService.confirm({
            message: 'Desea acreditar el lote?',
            header: 'Confirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
              this.actualizarEstadoLote(n_loac_id,codEstado,estadoDes);
              this.listlotesService.procesar(n_loac_id,tipoProceso).subscribe(data => {
              }, error =>{});
            },
            reject: () => {
             
            }
    }); 
  }

  simular(n_loac_id:number){
    console.log(n_loac_id);
    let tipoProceso = "S";
    let codEstado = "EJS";
    let estadoDes = "Simulando";
    
    this.confirmationService.confirm({
            message: 'Desea ejecutar la simulación?',
            header: 'Confirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
              this.actualizarEstadoLote(n_loac_id,codEstado,estadoDes);              
              this.listlotesService.procesar(n_loac_id,tipoProceso).subscribe(data => {
              }, error =>{});
            },
            reject: () => {
                
            }
    });
  }

  actualizarEstadoLote(n_loac_id:number, estado:string, estadoDes:string){
    this.isLoadingM = true;
    this.datasource.forEach((row) => {
      if (row.loteId == n_loac_id ){
        row.estadoLote = estado;
        row.estadoDescripcion = estadoDes;
      }
    });

    this.rows = this.datasource;
    this.page.totalElements = this.datasource.length;
    this.isLoadingM = false;
  }

  reporteSimulacion(n_loac_id:number){
    window.open("http://10.10.5.241:8090/suraAcreditacion/reporteSimulacion");
  }

  reporteAcreditacion(n_loac_id:number){
    window.open("http://10.10.5.241:8090/suraAcreditacion/reporteAcreditacion");
  }
  
  anular(n_loac_id:number){
    console.log(n_loac_id);

    this.confirmationService.confirm({
      message: 'Desea anular el lote?',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
          this.showModalProgressBar();
          this.listlotesService.anular(n_loac_id).subscribe(data => {
            this.hideModalProgressBar();
            //debugger;
            let _res = new respuestaService(null,null,null);
            _res = data;
            if (_res.codigo == "1"){
              this.notificationService.notify('success','Anular Lote', 'Se anulo el lote correctamente');
              this.ListarLote(null);
            }else{
              //let _msj : string = data['mensaje'];
              this.notificationService.notify('error','Anular Lote', 'Ocurrio un error.');
            }
            console.log(_res);
            
          },
          error=>{
            this.notificationService.notify('error', 'Anular Lote ', 'Ocurrio un error.');
            this.hideModalProgressBar();
          });
      },
      reject: () => {
                
      }
    });
  }

  showModal(n_loac_id:number) {
    console.log(n_loac_id);
    this.id_lote = n_loac_id;
    this.rowsM = [];
    this.datasourceM = [];
    this.totalRecordsM = 0;
    this.isPreview = false;
    this.displayModal = true;
    this.ListarLotePlanillaModal();
  }

  hideModal(row) {
    this.isPreview = false;
    this.displayModal = false;
  }

  showModalProgressBar() {
    this.isPreview = false;
    this.displayProgressBar = true;
  }

  hideModalProgressBar() {
    this.isPreview = false;
    this.displayProgressBar = false;
  }
}
