import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {Solicitudv2Service} from './solicitudv2.service';
import {Table} from 'primeng/table';
import 'rxjs/add/operator/take';
import { NotificationService } from '../core/components/notification/notification.service';

@Component({
  selector: 'app-solicitudv2',
  templateUrl: './solicitudv2.component.html',
  styleUrls: ['./solicitudv2.component.scss'],
  providers: [DatePipe,ConfirmationService,Solicitudv2Service],
  encapsulation: ViewEncapsulation.None
})
export class Solicitudv2Component implements OnInit {

  displayModal: boolean = false;
  titleModal: string;
  myDate: Date = new Date();
  rows = [];
  total:number = 0;

  minDate: Date = new Date();

  selectedSols: any[];
  selectedSol: any;
  isLoading = false;
  isPreview = false;

  curSolicitudv2: any;
  @ViewChild("dataTableComp") dataTableComponent: Table;

  page = { sizePerPage: 20, totalElements: 0, index: 0, rows:0 };

  constructor(
    private solicitudv2Service: Solicitudv2Service,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe) { }


  ngOnInit(){
  }

  openSolicitudv2(row) {
    this.curSolicitudv2 = JSON.parse(JSON.stringify(row));

    /*this.solicitudv2Service.getSolicitudv2ByCodigo(row['CodigoSolRep']).subscribe((data) => {
      this.curSolicitudv2 = data;
      this.isPreview = true;
      this.myDate = new Date(data['FechaSolRep']);
      this.showModal(this.curSolicitudv2);
    });*/

  }

  onPageChange(event){
    this.loadSolicityLazy(event);
  }

  loadSolicityLazy(params) {

    if (this.rows.length > 0) {
      this.selectedSol = [];
    }
    this.isLoading = true;
    let desde = (params.first | 0) + 1;
    let hasta = desde + (params.rows | 0) - 1;

    this.solicitudv2Service.getSolicitudv2(desde, hasta).take(1).subscribe(data => {
      this.rows = data['solicitudv2es'];
      this.page.totalElements = data['cantRegistros'];
      this.page.rows = data['solicitudv2es'].length;
      this.page.totalElements = data['cantRegistros'];
      this.isLoading = false;
    });
  }

  refresh() {
    if (this.rows.length > 0) {
      this.selectedSol = [];
    }
    this.isLoading = true;
    let desde = 1;
    let hasta = this.page.sizePerPage - 1;

    this.solicitudv2Service.getSolicitudv2(desde, hasta).take(1).subscribe(data => {
      this.rows = data['solicitudv2es'];
      this.page.totalElements = data['cantRegistros'];

      this.isLoading = false;
    });
  }


  onSubmit(model) {

    model.fechaSolRep = this.datePipe.transform(model.fechaSolRep, 'dd-MM-yyyy');
    model.usuarioSolRep = "winftc";
    this.solicitudv2Service.saveSolicitudv2(model).subscribe(res => {
      this.notificationService.notify('success', 'Agregar Solicitudv2', 'Se agrego exitosamente');
      this.page.index = 0;
      //this.dataTableComponent.reset();
      this.displayModal = false;
      console.log(res);
    });
  }

  procesamiento(row){
    let idSolRep = row.idSolRep;
    let fechaSolRep = row.fechaSolRep;
    let usuarioCreacion = row.usuarioCreacion;
    this.solicitudv2Service.procesar(idSolRep, fechaSolRep, usuarioCreacion).subscribe(res => {
      this.notificationService.notify('success','Acreditar Lote', 'Se invoco correctamente');
      console.log(res);
    });
  }

  aprobarSolicitudv2(row){

    let IdSolRep = row.idSolRep;
    let pUsuSis = row.usuarioCreacion;

    this.solicitudv2Service.aprobarSolicitudv2(IdSolRep, pUsuSis).subscribe(res => {
      this.notificationService.notify('success','Acreditar Lote', 'Se invoco correctamente');
      console.log(res);
    });
  }



  anular(SolReps) {
    var items = [];
    for (var i = 0; i < SolReps.length; ++i) {
      items.push(SolReps[i]['idSolRep']);
    }
    console.log({"ids":items});
    this.confirmationService.confirm({
      message: 'Estas seguro de Anular las solicitudv2es seleccionadas?',
      accept: () => {
        this.solicitudv2Service.anularSolicitudv2es(items).subscribe(
          res => {
            console.log(res);
            this.refresh()
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  showModal(row) {

    if (row) {
      this.titleModal = 'Solicitudv2 de Reprocesamiento';
    } else {
      this.titleModal = 'Agregar Solicitudv2 de Reprocesamiento';
      this.isPreview = false;
      this.curSolicitudv2 = null;
      this.myDate = null;
    }
    this.displayModal = true;
  }

}
