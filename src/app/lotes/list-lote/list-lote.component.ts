import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { ListLotesService } from '../list-lotes/list-lotes.service';
import { ListLoteService } from './list-lote.service';
import {Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../core/components/notification/notification.service';
import {Planilla} from '../../entity/planilla';
import {respuestaService} from '../../entity/respuestaService';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-list-lote',
  templateUrl: './list-lote.component.html',
  styleUrls: ['./list-lote.component.scss'],
  providers: [ListLoteService,ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class ListLoteComponent implements OnInit {
  displayModal: boolean = false;
  displayProgressBar: boolean = false;
  simulacion: boolean = false;
  titleModal: string;
  referencia: String;
  myDate: Date = new Date();

  rows: Planilla[];
  datasource: Planilla[];
  totalRecords: number = 0;

  rowsM: Planilla[];
  datasourceM: Planilla[];
  totalRecordsM: number = 0;

  desdeFecha = moment().format("DD-MM-YYYY"); //moment().subtract(1,'months').format('llll');
  hastaFecha = moment().format("DD-MM-YYYY");
  dFecha: Date =  new Date(); //new Date(this.desdeFecha);
  hFecha: Date = new Date();
  fechaP: Date = new Date();

  minDate: Date = new Date();
  afiliados:number;
  n_planilla:number;
  selectedPlanillas: Array<any> = [];
  selectedModalPlanillas: Array<any> = [];
  dataModalPlanillas: Array<any> = [];
  dataPlantillas: Array<any> = [];
  id_lotes: number;
  isLoading = false;
  isLoadingM = false;
  isPreview = false;

  isCheckedModal = false;
  isChecked = false;

  lote: any;
  @ViewChild("dataTableComp") dataTableComponent: Table;

  page = { sizePerPage: 10, totalElements: 0, index: 0, rows:0 };
  pageM = { sizePerPage: 10, totalElements: 0, index: 0, rowsM:0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loteService: ListLoteService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService) {
    this.id_lotes = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.rows = [];
    this.datasource = [];
    this.totalRecords = 0;
    this.isChecked = false;
  }

  loadLoteLazy(event) {
    this.isLoading = true;
    if(this.isChecked){
      this.selectedPlanillas = [];
      this.datasource.map((item) => this.selectedPlanillas.push(item));
    }

    if (this.datasource) {
      this.rows = this.datasource.slice(event.first, (event.first + event.rows));
      this.isLoading = false;
    }
  }

  loadLoteModalLazy(event) {
 
    if(this.isCheckedModal){
      this.selectedModalPlanillas = [];
      this.datasourceM.map((item) => this.selectedModalPlanillas.push(item));
    }

    this.isLoadingM = true;
    if (this.datasourceM) {
      this.rowsM = this.datasourceM.slice(event.first, (event.first + event.rows));
      this.isLoadingM = false;
    }
  }
  
  filterPlanillaModal(){
    if(!this.n_planilla){
        this.notificationService.notify('warn','Campo requerido', 'Ingrese número de planilla');
       return ;
    }
    this.rowsM = [];
    this.datasourceM = [];
    this.totalRecordsM = 0;
    this.selectedModalPlanillas = [];
    this.isLoadingM = true;
    this.showModalProgressBar();
    this.loteService.listarPorPlanilla(this.n_planilla).take(1).subscribe(data => {
      this.hideModalProgressBar();
      let _res = new respuestaService(null,null,null);
      _res = data;
      if(_res.codigo == "1"){
        this.datasourceM = (this.datasource) ? _res.datos.planillas.filter(function(e){return this.indexOf(e)<0;},this.datasource)  : _res.datos.planillas;
        this.rowsM = this.datasourceM;
        this.totalRecordsM = 1;
        this.isLoadingM = false;
      }
      else if (_res.codigo == "2"){
        this.notificationService.notify('warn','Listar planilla', 'Ya existe la planilla en un lote');
      }
      else if (_res.codigo == "3"){
        this.notificationService.notify('warn','Listar planilla', 'No existe la planilla');
      }
      else{
        let _msj = _res.mensaje;
        this.notificationService.notify('warn','Listar planilla', 'Ocurrio un error.');
      }
    }, error=>{
      this.hideModalProgressBar();
      this.notificationService.notify('error','Listar planilla', 'Ocurrio un error.');
    });
  }

  filterPlanillaFechaModal(){
    this.rowsM = [];
    this.datasourceM = [];
    this.totalRecordsM = 0;
    this.selectedModalPlanillas = [];
    this.desdeFecha = moment(this.dFecha).format('DD-MM-YYYY');
    this.hastaFecha = moment(this.hFecha).format('DD-MM-YYYY');
    let _afiliado = (this.afiliados !== undefined && (this.afiliados + "") !== "")? this.afiliados : 50000;
    let _desdeRegistro = 1;
    let _hastaRegistro = 5000;
    if (this.isDate(this.desdeFecha) && this.isDate(this.hastaFecha)) {
      if (this.validarFechaRango(this.desdeFecha,this.hastaFecha )){
        if (this.validarFechaMes(this.desdeFecha,this.hastaFecha )){
          this.showModalProgressBar();
          let _desde = moment(this.dFecha).format('YYYYMMDD');
          let _hasta = moment(this.hFecha).format('YYYYMMDD');
          this.loteService.listarPorFechaAfectados(_desde,_hasta,_afiliado,_desdeRegistro,_hastaRegistro).take(1).subscribe(data => {
            this.hideModalProgressBar();
            let _res = new respuestaService(null,null,null);
            _res = data;
            if(_res.codigo == "1"){
              this.datasourceM =  _res.datos.planillas;
              this.rowsM = this.datasourceM;
              this.totalRecordsM = _res.datos.cantRegistros;
              this.isLoadingM = false;
            }else{
            let _msj = _res.mensaje;
            this.notificationService.notify('warn','Listar planilla', 'Ocurrio un error.');
            }
          }, error=> {
            this.hideModalProgressBar();
            this.notificationService.notify('error','Listar planilla', 'Ocurrio un error.');
          });
        }
        else {
          this.notificationService.notify('error','Listar planilla', 'El rango de fecha debe ser un mes.');
        }
      }
      else {
        this.notificationService.notify('warn', 'Mensaje', 'Fecha inicio incorrecto');

      }
    }
    else{
      this.notificationService.notify('warn', 'Mensaje', 'Fecha incorrecta');
    }

  }

  validarPlanillasExistente(data){
    if(this.datasource){
        for (var i = 0;  i < data.length ; i++) {
          for (var j = 0; j < this.datasource.length ; j++) {
            if (this.datasource[j].numeroPlanilla == data[i].numeroPlanilla){
              this.notificationService.notify('warn', 'Mensaje', 'La planilla ya fue agregada.');
              return false;
            }
          }                
        }
    }
    return true;
  }

  validarFechaRango(fechaInicial,fechaFinal) {
    let valuesStart,valuesEnd;
    valuesStart = fechaInicial.split('-');
    valuesEnd = fechaFinal.split('-');
    // Verificamos que la fecha no sea posterior a la actual
    let dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
    let dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
    if(dateStart>dateEnd)
    {
      return 0;
    }
    return 1;
  }

  validarFechaMes(fechaInicial,fechaFinal) {
    let valuesStart,valuesEnd;
    valuesStart = fechaInicial.split('-');
    valuesEnd = fechaFinal.split('-');
    // Verificamos que la fecha no sea posterior a la actual
    let dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
    let dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
    //debugger;
    let dif = this.dateDiff(dateEnd,dateStart);
    
    if (dif > 31){
      return 0;
    }

    return 1;
  }

  isDate(txtDate) {
    let aoDate,           // needed for creating array and object
        ms,               // date in milliseconds
        month, day, year; // (integer) month, day and year
    // if separator is not defined then set '/'
    let separator = '-';
    // split input date to month, day and year
    aoDate = txtDate.split(separator);
    // array length should be exactly 3 (no more no less)
    if (aoDate.length !== 3) {
        return false;
    }
    // define month, day and year from array (expected format is m/d/yyyy)
    // subtraction will cast variables to integer implicitly
   
    day = aoDate[0] - 0;
    month = aoDate[1] - 1; // because months in JS start from 0
    year = aoDate[2] - 0;
    // test year range
    if (year < 1000 || year > 3000) {
        return false;
    }
    // convert input date to milliseconds
    ms = (new Date(year, month, day)).getTime();
    // initialize Date() object from milliseconds (reuse aoDate variable)
    aoDate = new Date();
    aoDate.setTime(ms);
    // compare input date and parts from Date() object
    // if difference exists then input date is not valid
    if (aoDate.getFullYear() !== year ||
        aoDate.getMonth() !== month ||
        aoDate.getDate() !== day) {
        return false;
    }
    // date is OK, return true
    return true;
  }

  dateDiff(date1, date2){
    let date1_obj = new Date(date1);
    let date2_obj = new Date(date2);
    let time1 = date1_obj.getTime();
    let time2 = date2_obj.getTime();
    let time_diff = time1-time2;
    let days_diff = Math.floor((time1-time2)/(1000*60*60*24));
    return days_diff;
  }

  isNumeric(type,event){
    if((type == 1) && (isNaN(parseFloat(event)) && !isFinite(event))) {
      this.n_planilla = undefined;
      return false;
    } 

    let keynum = event.which;
    if ((!isNaN(parseFloat(event.key)) && isFinite(event.key)) || (keynum == 8  || keynum == 46 ) || (keynum >=37 &&  keynum <=40))
      return true;   
    return false; 
  }

  anular() {
    this.datasource = this.datasource.filter(function(e){return this.indexOf(e)<0;},this.selectedPlanillas);
    this.rows = this.datasource;
    this.totalRecords = this.datasource.length;
    this.isLoading = false;
    this.selectedPlanillas = [];
  }

  guardar(){
    if(!this.referencia){
        this.notificationService.notify('warn','Campo requerido', 'Ingrese la descripción');
       return ;
    }
    if(this.rows.length <= 0){
        this.notificationService.notify('warn','Campo requerido', 'Ingrese las planillas');
       return ;
    }
    
    this.confirmationService.confirm({
      message: 'Desea guardar el lote?',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.showModalProgressBar();
        this.loteService.grabarLote(this.referencia,this.fechaP,this.datasource).subscribe(data => {
          this.hideModalProgressBar();
          let _res = new respuestaService(null,null,null);
          _res = data;
          if (_res.codigo == "1"){
            this.notificationService.notify('success', 'Guardar Lote', 'Datos grabados correctamente');
            this.page.index = 0;
            this.displayModal = false;
            this.router.navigate(['lotes']);
          }
          else if (_res.codigo == "2"){
            this.notificationService.notify('error','Guardar Lote', "ya existe la planilla en un lote");
          }
          else{
            let _msj = _res.mensaje;
            this.notificationService.notify('error','Guardar Lote', 'Ocurrio un error.');
          }
          console.log(_res);
        }, error => {
          this.hideModalProgressBar();
          this.notificationService.notify('error','Guardar Lote', 'Ocurrio un error.');
        });
      },
      reject: () => {
  
      }
    });
  }

  showModal(row) {
    this.rowsM = [];
    this.datasourceM = [];
    this.totalRecordsM = 0;
    this.selectedModalPlanillas = [];
    
    this.isPreview = false;
    this.lote = null;
    this.myDate = null;
    this.displayModal = true;
    this.isCheckedModal= false;
  }
  hideModal(row) {
    this.isPreview = false;
    this.lote = null;
    this.myDate = null;
    this.displayModal = false;
    this.isCheckedModal = false;
  }

  agregar(selectP){
    
    console.log("ANTES DE AGREGAR");
    if (selectP.length <= 0 ){
      this.notificationService.notify('info','Agregar Planilla', 'Seleccione almenos una planilla.');
      return;
    }

    if (this.validarPlanillasExistente(selectP)){
      //Agregamos las planillas a la lista principal
      this.datasource = (this.rows) ? this.datasource.concat(selectP): selectP;
      this.rows = this.datasource;
      this.totalRecords = this.datasource.length;
      //Eliminamos las planillas que se seleccionaron y pasaron a la lista principal
      this.datasourceM = this.datasourceM.filter(function(e){return this.indexOf(e)<0;},selectP);
      this.rowsM = this.datasourceM;
      this.totalRecordsM = this.datasourceM.length;

      this.isLoading = false;
      this.isLoadingM = false;
      this.selectedModalPlanillas = [];
      this.notificationService.notify('info','Agregar Planilla', selectP.length + ' planilla(s) agregada(s).');
      this.hideModal(null);
    }    
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
