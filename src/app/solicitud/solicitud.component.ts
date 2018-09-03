import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {SolicitudService} from './solicitud.service';
import {Table} from 'primeng/table';
import 'rxjs/add/operator/take';
import { NotificationService } from '../core/components/notification/notification.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  providers: [DatePipe,ConfirmationService,SolicitudService],
  encapsulation: ViewEncapsulation.None
})
export class SolicitudComponent implements OnInit {

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

  curSolicitud: any;
  @ViewChild("dataTableComp") dataTableComponent: Table;

  page = { sizePerPage: 20, totalElements: 0, index: 0, rows:0 };

  constructor(
    private solicitudService: SolicitudService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe) { }


  ngOnInit(){
  }

  openSolicitud(row) {
    this.curSolicitud = JSON.parse(JSON.stringify(row));

    /*this.solicitudService.getSolicitudByCodigo(row['CodigoSolRep']).subscribe((data) => {
      this.curSolicitud = data;
      this.isPreview = true;
      this.myDate = new Date(data['FechaSolRep']);
      this.showModal(this.curSolicitud);
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

    this.solicitudService.getSolicitud(desde, hasta).take(1).subscribe(data => {
      this.rows = data['solicitudes'];
      this.page.totalElements = data['cantRegistros'];
      this.page.rows = data['solicitudes'].length;
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

    this.solicitudService.getSolicitud(desde, hasta).take(1).subscribe(data => {
      this.rows = data['solicitudes'];
      this.page.totalElements = data['cantRegistros'];

      this.isLoading = false;
    });
  }


  onSubmit(model) {

    model.fechaSolRep = this.datePipe.transform(model.fechaSolRep, 'dd-MM-yyyy');
    model.usuarioSolRep = "winftc";
    this.solicitudService.saveSolicitud(model).subscribe(res => {
      this.notificationService.notify('success', 'Agregar Solicitud', 'Se agrego exitosamente');
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
    this.solicitudService.procesar(idSolRep, fechaSolRep, usuarioCreacion).subscribe(res => {
      this.notificationService.notify('success','Acreditar Lote', 'Se invoco correctamente');
      console.log(res);
    });
  }

  aprobarSolicitud(row){

    let IdSolRep = row.idSolRep;
    let pUsuSis = row.usuarioCreacion;

    this.solicitudService.aprobarSolicitud(IdSolRep, pUsuSis).subscribe(res => {
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
      message: 'Estas seguro de Anular las solicitudes seleccionadas?',
      accept: () => {
        this.solicitudService.anularSolicitudes(items).subscribe(
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
      this.titleModal = 'Solicitud de Reprocesamiento';
    } else {
      this.titleModal = 'Agregar Solicitud de Reprocesamiento';
      this.isPreview = false;
      this.curSolicitud = null;
      this.myDate = null;
    }
    this.displayModal = true;
  }

}
