import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {LogService} from './log.service';
import 'rxjs/add/operator/take';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {Calendar} from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  providers: [DatePipe,LogService]
})
export class LogComponent implements OnInit {

  private sub: any;
  private idLote : number;

  rows = [];
  selectedLogs: any[];
  isLoading = false;
  desdeFecha = moment().subtract(3,'months').format('llll');
  hastaFecha = moment().format("DD-MM-YYYY");
  dFecha: Date = new Date(this.desdeFecha);
  hFecha: Date = new Date();
  @ViewChild("dataTableComp") dataTableComponent: Table;
  page = { sizePerPage: 20, totalElements: 0, index: 0 };
  constructor(
    private logService: LogService, private route: ActivatedRoute) {


     }

  ngOnInit() {
    console.log(this.hFecha);
    console.log(this.dFecha);

    this.sub = this.route.params.subscribe(params => {
      console.log(params['id']); // (+) converts string 'id' to a number
      this.idLote = params['id'];
      // In a real app: dispatch action to load the details here.
   });

  }
  loadSolicityLazy(params) {
    if (this.rows.length > 0) {
      this.selectedLogs = [];
    }
    this.isLoading = true;
    let desde = (params.first | 0) + 1;
    let hasta = desde + (params.rows | 0) - 1;
    this.desdeFecha = moment(this.dFecha).format('DD-MM-YYYY');
    this.hastaFecha = moment(this.hFecha).format('DD-MM-YYYY');
    this.logService.getLog(desde, hasta,this.desdeFecha,this.hastaFecha,this.idLote).take(1).subscribe(data => {
      this.rows = data['data'];
      this.page.totalElements = data['total'];
      this.isLoading = false;
      console.log(data);
    });
  }
  filterDate() {
    if (this.rows.length > 0) {
      this.selectedLogs = [];
    }
    this.isLoading = true;
    let desde = 1;
    let hasta = this.page.sizePerPage - 1;
    this.desdeFecha = moment(this.dFecha).format('DD-MM-YYYY');
    this.hastaFecha = moment(this.hFecha).format('DD-MM-YYYY');
    this.logService.getLog(desde, hasta, this.desdeFecha, this.hastaFecha,this.idLote).take(1).subscribe(data => {
      this.rows = data['data'];
      this.page.totalElements = data['total'];
      this.isLoading = false;
    });
  }
}
