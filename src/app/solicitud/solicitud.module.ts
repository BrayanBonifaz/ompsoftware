import { NotificationService } from './../core/components/notification/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud.component';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { CoreModule } from '../core/core.module';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule, ConfirmDialogModule, DataTableModule, TooltipModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/editor';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SolicitudRoutingModule,
    CommonModule,
    SolicitudRoutingModule,
    DataTableModule,
    TableModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    EditorModule,
    PanelModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule
  ],
  declarations: [SolicitudComponent],
  providers:[]
})
export class SolicitudModule { }
